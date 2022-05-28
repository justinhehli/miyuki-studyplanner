import iModule from "./i-module";

interface ISemester {
  id: string;
  startDate: Date;
  endDate: Date;
  index: number;

  modules: iModule[];

  isCurrentSemester: () => boolean;
}

export default ISemester;
