import { AppointmentModel } from "@devexpress/dx-react-scheduler";

interface IMiyukiAppointmentModel extends AppointmentModel {
  semesterId: string;
  moduleId: string | null;
}

export default IMiyukiAppointmentModel;
