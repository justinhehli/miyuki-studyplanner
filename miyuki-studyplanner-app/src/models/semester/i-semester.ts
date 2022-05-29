import IModule from "./i-module";

interface ISemester {
  id: string;
  startDate: Date;
  endDate: Date;
  index: number;

  modules: IModule[];

  isCurrentSemester: () => boolean;
}

export default ISemester;
