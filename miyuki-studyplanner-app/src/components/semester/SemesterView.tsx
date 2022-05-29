import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabPanel, { tabA11yProps } from "../base/TabPanel";
import SemesterInfo from "./SemesterInfo";
import SemesterModules from "./SemesterModules";
import ISemester from "../../models/semester/i-semester";

const SemesterView: React.FC<{ semester: ISemester }> = (props) => {
  const [semesterMenuTabsValue, setSemesterMenuTabsValue] = useState(0);

  const semesterMenuTabValueChangeHandler = (_event: React.SyntheticEvent, newValue: number) => {
    setSemesterMenuTabsValue(newValue);
  };

  return (
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
          <SemesterInfo semester={props.semester} />
        </TabPanel>
        <TabPanel value={semesterMenuTabsValue} index={1}>
          <SemesterModules semesterId={props.semester.id} />
        </TabPanel>
        <TabPanel value={semesterMenuTabsValue} index={2}>
          Schedule
        </TabPanel>
      </Box>
    </Slide>
  );
};

export default SemesterView;
