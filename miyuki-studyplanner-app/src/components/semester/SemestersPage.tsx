import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store";
import { selectAllSemestersSorted } from "../../store/semester/semester-slice-selectors";
import TabPanel, { tabA11yProps } from "../base/TabPanel";
import SemesterInfo from "./SemesterInfo";
import SemesterModules from "./SemesterModules";

const tabsWidthPx = 200;
const SemestersPage: React.FC = () => {
  const [selectedSemesterArrayIndex, setSelectedSemesterArrayIndex] = useState<number | null>(null);
  const [semesterMenuTabsValue, setSemesterMenuTabsValue] = useState(0);

  const semesters = useAppSelector((state) => selectAllSemestersSorted(state));

  useEffect(() => {
    if (selectedSemesterArrayIndex == null && semesters.length !== 0) {
      const currentSemArrayIndex = semesters.findIndex((s) => s.isCurrentSemester());
      setSelectedSemesterArrayIndex(currentSemArrayIndex !== -1 ? currentSemArrayIndex : semesters.length - 1);
    }
  }, [selectedSemesterArrayIndex, semesters]);

  const semestersTabValueChangeHandler = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedSemesterArrayIndex(newValue);
  };

  const semesterMenuTabValueChangeHandler = (_event: React.SyntheticEvent, newValue: number) => {
    setSemesterMenuTabsValue(newValue);
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
          <Slide direction="down" in={true}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={semesterMenuTabsValue}
                  onChange={semesterMenuTabValueChangeHandler}
                  aria-label="basic tabs example"
                >
                  <Tab label="Semester Info" {...tabA11yProps(0)} />
                  <Tab label="Modules" {...tabA11yProps(1)} />
                  <Tab label="Schedule" {...tabA11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={semesterMenuTabsValue} index={0}>
                <SemesterInfo semester={s} />
              </TabPanel>
              <TabPanel value={semesterMenuTabsValue} index={1}>
                <SemesterModules semesterId={s.id} />
              </TabPanel>
              <TabPanel value={semesterMenuTabsValue} index={2}>
                Schedule
              </TabPanel>
            </Box>
          </Slide>
        </TabPanel>
      ))}
    </Box>
  );
};

export default SemestersPage;
