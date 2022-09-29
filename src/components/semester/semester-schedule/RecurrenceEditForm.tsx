import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React from "react";
import Typography from "@mui/material/Typography";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { RRule, Weekday as RRuleWeekday } from "rrule";
import { useAppSelector } from "../../../store";
import { selectSemesterById } from "../../../store/semester/semester-slice-selectors";

const allWeekdays = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA, RRule.SU];

const getCurrentDayPlusOneWeek = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 7);
  return currentDate;
};

const RecurrenceEditForm: React.FC<{
  rRuleStr: string | undefined;
  semesterId: string;
  onChange: (rRuleStr: string) => void;
}> = ({ rRuleStr, semesterId, onChange }) => {
  const semester = useAppSelector(selectSemesterById(semesterId));

  const rRule = rRuleStr
    ? RRule.fromString(rRuleStr)
    : new RRule({
        freq: RRule.WEEKLY,
        interval: 1,
        byweekday: [new RRuleWeekday(new Date().getDay())],
        dtstart: new Date(),
        until: semester?.endDateStr != null ? new Date(semester.endDateStr) : getCurrentDayPlusOneWeek(),
      });

  const weekdaysChangeHandler = (_event: React.MouseEvent<HTMLElement>, newWeekdays: number[]) => {
    if (newWeekdays.length > 0) {
      const updatedRRule = new RRule({
        freq: rRule.options.freq,
        interval: rRule.options.interval,
        byweekday: newWeekdays.map((w) => new RRuleWeekday(w)),
        dtstart: rRule.options.dtstart,
        until: rRule.options.until,
      });

      onChange(updatedRRule.toString());
    }
  };

  const endDateChangeHandler = (newEndDate: Date | null) => {
    if (newEndDate != null) {
      const updatedRRule = new RRule({
        freq: rRule.options.freq,
        interval: rRule.options.interval,
        byweekday: rRule.options.byweekday,
        dtstart: rRule.options.dtstart,
        until: newEndDate,
      });

      onChange(updatedRRule.toString());
    }
  };

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="h6">Repeat (Weekly)</Typography>
      </Grid>

      <Grid item xs={12} md={7}>
        <ToggleButtonGroup
          value={rRule.options.byweekday}
          onChange={weekdaysChangeHandler}
          fullWidth
          size="small"
          color="primary"
        >
          {allWeekdays.map((w) => (
            <ToggleButton key={w.weekday} value={w.weekday}>
              {w.toString().charAt(0)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>

      <Grid item xs={12} md={5}>
        <DesktopDatePicker
          label="Until"
          inputFormat="dd-MM-yyyy"
          mask="__-__-____"
          value={rRule.options.until}
          onChange={endDateChangeHandler}
          renderInput={(params) => <TextField {...params} size="small" fullWidth />}
        />
      </Grid>
    </React.Fragment>
  );
};

export default RecurrenceEditForm;
