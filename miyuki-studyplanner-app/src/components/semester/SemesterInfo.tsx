import React from "react";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import ISemester from "../../models/semester/i-semester";
import { useAppDispatch } from "../../store";
import { deleteSemesterById, updateSemesterValues } from "../../store/semester/semester-slice";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

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

  const deleteSemesterClickHandler = (_event: React.MouseEvent) => {
    dispatch(deleteSemesterById(props.semester.id));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Semester"
            type="number"
            size="small"
            value={props.semester.index}
            onChange={indexChangeHandler}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DesktopDatePicker
            label="Start Date"
            inputFormat="dd-MM-yyyy"
            mask="__-__-____"
            value={new Date(props.semester.startDateStr)}
            onChange={startDateChangeHandler}
            renderInput={(params) => <TextField {...params} size="small" fullWidth />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DesktopDatePicker
            label="End Date"
            inputFormat="dd-MM-yyyy"
            mask="__-__-____"
            value={new Date(props.semester.endDateStr)}
            onChange={endDateChangeHandler}
            renderInput={(params) => <TextField {...params} size="small" fullWidth />}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="outlined" color="secondary" onClick={deleteSemesterClickHandler}>
            Delete Semester
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default SemesterInfo;
