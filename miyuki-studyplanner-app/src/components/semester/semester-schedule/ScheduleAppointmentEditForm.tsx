import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  addAppointmentToSemester,
  deleteAppointmentById,
  updateAppointmentValues,
} from "../../../store/semester/semester-slice";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import RecurrenceEditForm from "./RecurrenceEditForm";
import { selectModulesBySemesterId } from "../../../store/semester/semester-slice-selectors";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import IMiyukiAppointmentModel from "../../../models/semester/i-miyuki-appointment-model";

const classes = {
  centeredRowFlexbox: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
  },
};

const ScheduleAppointmentEditForm: React.FC<{
  appointment: IMiyukiAppointmentModel;
  isNewAppointment: boolean;
  onClose: () => void;
}> = ({ appointment, isNewAppointment, onClose }) => {
  const [updatedAppointment, setUpdatedAppointment] = useState(appointment);
  const [isRecurring, setIsRecurring] = useState(appointment.rRule !== undefined);

  const dispatch = useAppDispatch();
  const currentSemesterModules = useAppSelector(selectModulesBySemesterId(appointment.semesterId));

  const submitHandler = () => {
    if (isNewAppointment) {
      dispatch(addAppointmentToSemester(updatedAppointment));
    } else {
      dispatch(updateAppointmentValues(updatedAppointment));
    }
    onClose();
  };

  const deleteClickHandler = (_event: React.MouseEvent) => {
    if (updatedAppointment.id != null && typeof updatedAppointment.id === "string") {
      if (!isNewAppointment) {
        dispatch(deleteAppointmentById(updatedAppointment.id));
      }
      onClose();
    }
  };

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedAppointment((prevApp) => ({ ...prevApp, title: event.target.value }));
  };

  const startDateChangeHandler = (newStartDate: Date | null) => {
    if (newStartDate != null) {
      setUpdatedAppointment((prevApp) => ({ ...prevApp, startDate: new Date(newStartDate).toISOString() }));
    }
  };

  const endDateChangeHandler = (newEndDate: Date | null) => {
    if (newEndDate != null) {
      setUpdatedAppointment((prevApp) => ({ ...prevApp, endDate: new Date(newEndDate).toISOString() }));
    }
  };

  const isRecurringChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsRecurring(event.target.checked);
    if (!event.target.checked) {
      setUpdatedAppointment((prevApp) => ({ ...prevApp, rRule: undefined }));
    }
  };

  const recurrenceChangeHandler = (rRuleStr: string) => {
    setUpdatedAppointment((prevApp) => ({ ...prevApp, rRule: rRuleStr }));
  };

  const moduleChangeHandler = (event: SelectChangeEvent) => {
    setUpdatedAppointment((prevApp) => ({ ...prevApp, moduleId: event.target.value }));
  };

  return (
    <form onSubmit={submitHandler}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Details</Typography>
        </Grid>

        {(isNewAppointment || appointment.moduleId != null) && (
          <Grid item xs={12}>
            <FormControl fullWidth variant="standard" size="small">
              <InputLabel>Module</InputLabel>
              <Select
                value={appointment.moduleId ?? undefined}
                label="Module"
                disabled={!isNewAppointment}
                onChange={moduleChangeHandler}
              >
                {currentSemesterModules?.map((m) => (
                  <MenuItem value={m.id}>{m.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}

        <Grid item xs={12}>
          <TextField
            label="Title"
            variant="standard"
            size="small"
            multiline
            fullWidth
            value={updatedAppointment.title}
            onChange={titleChangeHandler}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <DateTimePicker
            label="From"
            value={updatedAppointment.startDate}
            onChange={startDateChangeHandler}
            renderInput={(params) => <TextField {...params} size="small" fullWidth />}
          />
        </Grid>
        <Grid item xs={0} sm={2} sx={classes.centeredRowFlexbox}>
          -
        </Grid>
        <Grid item xs={12} sm={5}>
          <DateTimePicker
            label="To"
            value={updatedAppointment.endDate}
            onChange={endDateChangeHandler}
            renderInput={(params) => <TextField {...params} size="small" fullWidth />}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch onChange={isRecurringChangeHandler} checked={isRecurring} />}
            label="Repeat"
          />
        </Grid>

        {isRecurring && (
          <RecurrenceEditForm
            rRuleStr={updatedAppointment.rRule}
            semesterId={updatedAppointment.semesterId}
            onChange={recurrenceChangeHandler}
          />
        )}

        <Grid item xs={12} sx={{ display: "flex", flexFlow: "row nowrap", justifyContent: "flex-start", gap: 1 }}>
          <Button variant="outlined" color="primary" type="submit">
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={deleteClickHandler}>
            Delete
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ScheduleAppointmentEditForm;
