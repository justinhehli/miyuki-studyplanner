import React from "react";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, MonthView, Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import { useAppSelector } from "../../store";
import { selectAppointmentsBySemesterId, selectModuleById } from "../../store/semester/semester-slice-selectors";
import { useTheme } from "@mui/material/styles";

const MiyukiAppointment = ({ children, data, ...restProps }: Appointments.AppointmentProps) => {
  const module = useAppSelector(selectModuleById(data.semesterId, data.moduleId));
  const theme = useTheme();

  return (
    <Appointments.Appointment
      {...restProps}
      data={data}
      style={{
        backgroundColor: module?.color ?? theme.palette.primary.main,
      }}
    >
      {children}
    </Appointments.Appointment>
  );
};

const SemesterSchedule: React.FC<{ semesterId: string }> = (props) => {
  const appointments = useAppSelector(selectAppointmentsBySemesterId(props.semesterId));
  console.log(appointments);

  return (
    <Paper sx={{ padding: 1 }}>
      <Scheduler data={appointments ?? []} firstDayOfWeek={1}>
        <ViewState />
        <MonthView />
        <Appointments appointmentComponent={MiyukiAppointment} />
      </Scheduler>
    </Paper>
  );
};

export default SemesterSchedule;
