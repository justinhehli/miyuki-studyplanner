import React, { useState } from "react";
import Slide from "@mui/material/Slide";
import Semester from "../../models/semester/semester";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel, { tabA11yProps } from "../base/TabPanel";
import SemesterInfo from "./SemesterInfo";

const SingleSemester: React.FC<{ semester: Semester }> = (props) => {
  const [tabsValue, setTabsValue] = useState(0);

  const tabValueChangeHandler = (_event: React.SyntheticEvent, newValue: number) => {
    setTabsValue(newValue);
  };

  return (
    <Slide direction="down" in={true}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabsValue} onChange={tabValueChangeHandler} aria-label="basic tabs example">
            <Tab label="Semester Info" {...tabA11yProps(0)} />
            <Tab label="Modules" {...tabA11yProps(1)} />
            <Tab label="Schedule" {...tabA11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={tabsValue} index={0}>
          <SemesterInfo semester={props.semester} />
        </TabPanel>
        <TabPanel value={tabsValue} index={1}>
          Modules
        </TabPanel>
        <TabPanel value={tabsValue} index={2}>
          Schedule
        </TabPanel>
      </Box>
    </Slide>
  );
};

export default SingleSemester;
