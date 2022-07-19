import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { isCurrentSemester } from "../../models/semester/i-semester";
import { useAppSelector } from "../../store";
import { selectAllSemestersSorted } from "../../store/semester/semester-slice-selectors";
import TabPanel, { tabA11yProps } from "../base/TabPanel";
import SemesterView from "./SemesterView";

const tabsWidthPx = 200;
const SemestersPage: React.FC = () => {
  const [selectedSemesterArrayIndex, setSelectedSemesterArrayIndex] = useState<number | null>(null);

  const semesters = useAppSelector((state) => selectAllSemestersSorted(state));

  useEffect(() => {
    if (selectedSemesterArrayIndex == null && semesters.length !== 0) {
      const currentSemArrayIndex = semesters.findIndex((s) => isCurrentSemester(s));
      setSelectedSemesterArrayIndex(currentSemArrayIndex !== -1 ? currentSemArrayIndex : semesters.length - 1);
    }
  }, [selectedSemesterArrayIndex, semesters]);

  const semestersTabValueChangeHandler = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedSemesterArrayIndex(newValue);
  };

  if (semesters.length === 0) {
    return <Typography>no semesters yet</Typography>;
  }
  if (selectedSemesterArrayIndex == null) {
    return <Typography>no semester selected</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedSemesterArrayIndex}
        onChange={semestersTabValueChangeHandler}
        sx={{ borderRight: 1, borderColor: "divider", width: `${tabsWidthPx}px` }}
      >
        {semesters.map((s, i) => (
          <Tab key={i} label={`Semester ${s.index}`} {...tabA11yProps(0)} />
        ))}
      </Tabs>
      {semesters.map((s, i) => (
        <TabPanel
          key={i}
          value={selectedSemesterArrayIndex}
          index={i}
          width={`calc(100% - ${tabsWidthPx * 2}px)`}
          containerPadding={0}
        >
          <SemesterView semester={s} />
        </TabPanel>
      ))}
    </Box>
  );
};

export default SemestersPage;
