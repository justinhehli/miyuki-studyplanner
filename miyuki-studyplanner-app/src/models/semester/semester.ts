import { v4 as uuidv4 } from "uuid";
import IModule from "./i-module";
import ISemester from "./i-semester";

class Semester implements ISemester {
  id: string;
  startDate: Date;
  endDate: Date;
  index: number;
  modules: IModule[];

  constructor(
    startDate: Date,
    endDate: Date,
    index: number,
    modules: IModule[],
    id: string | null = null
  ) {
    this.id = id ?? uuidv4();
    this.startDate = startDate;
    this.endDate = endDate;
    this.index = index;

    this.modules = modules;
  }

  isCurrentSemester() {
    const currentTime = new Date().getTime();
    return this.startDate.getTime() <= currentTime && currentTime <= this.endDate.getTime();
  }
}

export default Semester;
