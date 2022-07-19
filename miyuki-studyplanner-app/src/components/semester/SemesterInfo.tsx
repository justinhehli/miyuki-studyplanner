import React from "react";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import ISemester from "../../models/semester/i-semester";
import { useAppDispatch } from "../../store";
import { updateSemesterValues } from "../../store/semester/semester-slice";

const SemesterInfo: React.FC<{ semester: ISemester }> = (props) => {
  const dispatch = useAppDispatch();

  const indexChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSemesterValues({ ...props.semester, index: Number(event.target.value) }));
  };

  const startDateChangeHandler = (newStartDate: Date | null) => {
    if (newStartDate != null) {
      dispatch(updateSemesterValues({ ...props.semester, startDateStr: newStartDate.toDateString() }));
    }
  };

  const endDateChangeHandler = (newEndDate: Date | null) => {
    if (newEndDate != null) {
      dispatch(updateSemesterValues({ ...props.semester, endDateStr: newEndDate.toDateString() }));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack direction="row" spacing={1}>
        <TextField
          label="Semester"
          type="number"
          size="small"
          value={props.semester.index}
          onChange={indexChangeHandler}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <DesktopDatePicker
          label="Start Date"
          inputFormat="dd-MM-yyyy"
          mask="__-__-____"
          value={new Date(props.semester.startDateStr)}
          onChange={startDateChangeHandler}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
        <DesktopDatePicker
          label="End Date"
          inputFormat="dd-MM-yyyy"
          mask="__-__-____"
          value={new Date(props.semester.endDateStr)}
          onChange={endDateChangeHandler}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default SemesterInfo;
