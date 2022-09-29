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
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import IMiyukiAppointmentModel, { getNewDefaultAppointment } from "../../../models/semester/i-miyuki-appointment-model";

interface ISchedulerContext {
  currentlyEditedAppointment: { appointment: AppointmentModel; isNewTemporary: boolean } | null;
  setCurrentlyEditedAppointment: (appointment: { appointment: AppointmentModel; isNewTemporary: boolean }) => void;
}

const schedulerContext = createContext<ISchedulerContext>({
  currentlyEditedAppointment: null,
  setCurrentlyEditedAppointment: ({ appointment: AppointmentModel, isNewTemporary: boolean }) => {},
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
      setCurrentlyEditedAppointment({ appointment: props.appointmentMeta.data, isNewTemporary: false });
    }
  };

  return <AppointmentTooltip.Layout onOpenButtonClick={openButtonClickHandler} {...props} />;
};

const SemesterSchedule: React.FC<{ semesterId: string }> = ({ semesterId }) => {
  const [currentlyEditedAppointment, setCurrentlyEditedAppointment] = useState<{
    appointment: AppointmentModel;
    isNewTemporary: boolean;
  } | null>(null);

  const appointments = useAppSelector(selectAppointmentsBySemesterId(semesterId));

  const handleEditFormClose = () => {
    setCurrentlyEditedAppointment(null);
  };

  const newAppointmentClickHandler = (_event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentlyEditedAppointment({ appointment: getNewDefaultAppointment(semesterId), isNewTemporary: true });
  };

  return (
    <schedulerContext.Provider
      value={{
        currentlyEditedAppointment: currentlyEditedAppointment,
        setCurrentlyEditedAppointment: setCurrentlyEditedAppointment,
      }}
    >
      <Paper sx={{ padding: 1 }}>
        <Box sx={{ position: "relative" }}>
          <Fab
            color="primary"
            size="small"
            sx={{ color: "#FFFFFF", position: "absolute", right: 0 }}
            onClick={newAppointmentClickHandler}
          >
            <AddIcon />
          </Fab>
        </Box>

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
            <ScheduleAppointmentEditForm
              appointment={currentlyEditedAppointment.appointment as IMiyukiAppointmentModel}
              isNewAppointment={currentlyEditedAppointment.isNewTemporary}
              onClose={handleEditFormClose}
            />
          </DialogContent>
        </Dialog>
      )}
    </schedulerContext.Provider>
  );
};

export default SemesterSchedule;
