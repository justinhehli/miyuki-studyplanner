import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabPanel, { tabA11yProps } from "../base/TabPanel";
import SemesterInfo from "./SemesterInfo";
import SemesterModules from "./semester-module/SemesterModules";
import SemesterSchedule from "./semester-schedule/SemesterSchedule";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store";
import { selectSemesterById } from "../../store/semester/semester-slice-selectors";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";

const SemesterView: React.FC = () => {
  const [semesterMenuTabsValue, setSemesterMenuTabsValue] = useState(0);

  const { semesterId } = useParams<{ semesterId: string }>() as { semesterId: string };
  const semester = useAppSelector(selectSemesterById(semesterId));

  const semesterMenuTabValueChangeHandler = (_event: React.SyntheticEvent, newValue: number) => {
    setSemesterMenuTabsValue(newValue);
  };

  if (semester == null) {
    return null;
  }

  return (
    <Slide key={semesterId} direction="down" in={true}>
      <Box>
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
          <Container maxWidth="md">
            <SemesterInfo semester={semester} />
          </Container>
        </TabPanel>
        <TabPanel value={semesterMenuTabsValue} index={1}>
          <Container maxWidth="md">
            <SemesterModules semesterId={semester.id} />
          </Container>
        </TabPanel>
        <TabPanel value={semesterMenuTabsValue} index={2}>
          <SemesterSchedule semesterId={semester.id} />
        </TabPanel>
      </Box>
    </Slide>
  );
};

export default SemesterView;
