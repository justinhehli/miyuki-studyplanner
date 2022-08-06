import IMiyukiAppointmentModel from "./i-miyuki-appointment-model";
import IModule from "./i-module";

interface ISemester {
  id: string;
  startDateStr: string;
  endDateStr: string;
  index: number;

  modules: IModule[];
  appointments: IMiyukiAppointmentModel[];
}

export const isCurrentSemester = (semester: ISemester) => {
  const currentTime = new Date().getTime();
  return (
    new Date(semester.startDateStr).getTime() <= currentTime && currentTime <= new Date(semester.endDateStr).getTime()
  );
};

export default ISemester;
