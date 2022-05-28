import Stack from "@mui/material/Stack";
import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";
import Semester from "../../models/semester/semester";

const styles = {};

const SingleSemester: React.FC<{ semester: Semester }> = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Slide direction="right" in={true}>
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
            value={props.semester.startDate}
            onChange={() => {}}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
          <DesktopDatePicker
            label="End Date"
            inputFormat="dd-MM-yyyy"
            value={props.semester.endDate}
            onChange={() => {}}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </Stack>
      </Slide>
    </LocalizationProvider>
  );
};

export default SingleSemester;
