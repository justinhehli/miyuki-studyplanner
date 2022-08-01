import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { isCurrentSemester } from "../../models/semester/i-semester";
import { useAppDispatch, useAppSelector } from "../../store";
import { addSemester } from "../../store/semester/semester-slice";
import { selectAllSemestersSorted } from "../../store/semester/semester-slice-selectors";
import TabPanel, { tabA11yProps } from "../base/TabPanel";
import SemesterView from "./SemesterView";

const tabsWidthPx = 200;
const styles = {
  box: {
    flexGrow: 1,
    bgcolor: "background.paper",
    display: "flex",
  },
  tabs: {
    borderRight: 1,
    borderColor: "divider",
    width: `${tabsWidthPx}px`,
    position: "fixed",
  },
};

const SemestersPage: React.FC = () => {
  const [selectedSemesterArrayIndex, setSelectedSemesterArrayIndex] = useState<number | null>(null);

  const dispatch = useAppDispatch();
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

  const addSemesterClickHandler = (_event: React.MouseEvent) => {
    dispatch(addSemester());
  };

  return (
    <Box sx={{ ...styles.box }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedSemesterArrayIndex}
        onChange={semestersTabValueChangeHandler}
        sx={{ ...styles.tabs }}
      >
        {semesters.length === 0 && <Typography>no semesters yet</Typography>}
        {semesters.map((s, i) => (
          <Tab key={i} label={`Semester ${s.index}`} {...tabA11yProps(0)} />
        ))}
        <Button variant="text" onClick={addSemesterClickHandler}>
          + Semester
        </Button>
      </Tabs>
      <Box sx={{ width: `${tabsWidthPx}px` }} />
      {selectedSemesterArrayIndex != null &&
        semesters.map((s, i) => (
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
