import React from "react";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import ISemester from "../../models/semester/i-semester";

const SemesterInfo: React.FC<{ semester: ISemester }> = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack direction="row" spacing={1}>
        <TextField
          label="Semester"
          type="number"
          size="small"
          value={props.semester.index}
          onChange={() => {}}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <DesktopDatePicker
          label="Start Date"
          inputFormat="dd-MM-yyyy"
          mask="__-__-____"
          value={props.semester.startDate}
          onChange={() => {}}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
        <DesktopDatePicker
          label="End Date"
          inputFormat="dd-MM-yyyy"
          mask="__-__-____"
          value={props.semester.endDate}
          onChange={() => {}}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default SemesterInfo;
