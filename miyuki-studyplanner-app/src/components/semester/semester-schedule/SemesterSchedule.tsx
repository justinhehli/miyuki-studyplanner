import React, { createContext, useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import { AppointmentModel, ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, MonthView, Appointments, AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { useAppSelector } from "../../../store";
import { selectAppointmentsBySemesterId, selectModuleById } from "../../../store/semester/semester-slice-selectors";
import { useTheme } from "@mui/material/styles";
import ScheduleAppointmentEditForm from "./ScheduleAppointmentEditForm";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

interface ISchedulerContext {
  currentlyEditedAppointment: AppointmentModel | null;
  setCurrentlyEditedAppointment: (appointment: AppointmentModel) => void;
}

const schedulerContext = createContext<ISchedulerContext>({
  currentlyEditedAppointment: null,
  setCurrentlyEditedAppointment: (appointment: AppointmentModel) => {},
});

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

const MiyukiAppointmentTooltip = (props: AppointmentTooltip.LayoutProps) => {
  const { setCurrentlyEditedAppointment } = useContext(schedulerContext);

  const openButtonClickHandler = () => {
    if (props.appointmentMeta?.data != null) {
      setCurrentlyEditedAppointment(props.appointmentMeta.data);
    }
  };

  return <AppointmentTooltip.Layout onOpenButtonClick={openButtonClickHandler} {...props} />;
};

const SemesterSchedule: React.FC<{ semesterId: string }> = (props) => {
  const [currentlyEditedAppointment, setCurrentlyEditedAppointment] = useState<AppointmentModel | null>(null);

  const appointments = useAppSelector(selectAppointmentsBySemesterId(props.semesterId));

  const handleEditFormClose = () => {
    setCurrentlyEditedAppointment(null);
  };

  return (
    <schedulerContext.Provider
      value={{
        currentlyEditedAppointment: currentlyEditedAppointment,
        setCurrentlyEditedAppointment: setCurrentlyEditedAppointment,
      }}
    >
      <Paper sx={{ padding: 1 }}>
        <Scheduler data={appointments ?? []} firstDayOfWeek={1}>
          <ViewState />

          <MonthView />

          <Appointments appointmentComponent={MiyukiAppointment} />
          <AppointmentTooltip showOpenButton layoutComponent={MiyukiAppointmentTooltip} />
        </Scheduler>
      </Paper>

      {currentlyEditedAppointment != null && (
        <Dialog open={currentlyEditedAppointment != null} maxWidth="sm" fullWidth onClose={handleEditFormClose}>
          <DialogContent>
            <ScheduleAppointmentEditForm appointment={currentlyEditedAppointment} onClose={handleEditFormClose} />
          </DialogContent>
        </Dialog>
      )}
    </schedulerContext.Provider>
  );
};

export default SemesterSchedule;
