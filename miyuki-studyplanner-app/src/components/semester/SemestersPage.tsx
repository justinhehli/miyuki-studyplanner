import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store";
import { selectAllSemestersSorted } from "../../store/semester/semester-slice-selectors";
import SingleSemester from "./SingleSemester";

const TabPanel = (props: { children?: React.ReactNode; index: number; value: number }) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Container sx={{ p: 3, border: "1px solid red" }}>{children}</Container>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};

const SemestersPage: React.FC = () => {
  const [selectedSemesterArrayIndex, setSelectedSemesterArrayIndex] = useState<number | null>(null);

  const semesters = useAppSelector((state) => selectAllSemestersSorted(state));

  useEffect(() => {
    if (selectedSemesterArrayIndex == null && semesters.length !== 0) {
      const currentSemArrayIndex = semesters.findIndex((s) => s.isCurrentSemester());
      setSelectedSemesterArrayIndex(currentSemArrayIndex !== -1 ? currentSemArrayIndex : semesters.length - 1);
    }
  }, [selectedSemesterArrayIndex, semesters]);

  const tabValueChangeHandler = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedSemesterArrayIndex(newValue);
  };

  if (semesters.length === 0) {
    return <Typography>no semesters yet</Typography>;
  }
  if (selectedSemesterArrayIndex == null) {
    return <Typography>no semester selected</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", height: 224 }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedSemesterArrayIndex}
        onChange={tabValueChangeHandler}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {semesters.map((s, i) => (
          <Tab key={i} label={`Semester ${s.index}`} {...a11yProps(0)} />
        ))}
      </Tabs>
      {semesters.map((s, i) => (
        <TabPanel key={i} value={selectedSemesterArrayIndex} index={i}>
          <SingleSemester semester={s} />
        </TabPanel>
      ))}
    </Box>
  );
};

export default SemestersPage;
