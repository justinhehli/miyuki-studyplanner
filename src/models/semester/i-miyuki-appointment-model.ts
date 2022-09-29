import { v4 as uuidv4 } from "uuid";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";

interface IMiyukiAppointmentModel extends AppointmentModel {
  semesterId: string;
  moduleId: string | null;
}

export const getNewDefaultAppointment = (semesterId: string): IMiyukiAppointmentModel => {
  const startDate = new Date();
  startDate.setMinutes(Math.ceil(startDate.getMinutes() / 30) * 30);
  const endDate = startDate;
  endDate.setHours(endDate.getHours() + 1);

  return {
    id: uuidv4(),
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    title: "New event",
    semesterId: semesterId,
    moduleId: null,
  };
};

export default IMiyukiAppointmentModel;
