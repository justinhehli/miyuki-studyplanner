import { v4 as uuidv4 } from "uuid";
import iModule from "./i-module";

class Module implements iModule {
  id: string;
  title: string;
  description: string | null;
  ects: number;
  timeEffortByEctsHours: number;
  timeEffortPredictedHours: number;

  constructor(
    title: string,
    description: string | null,
    ects: number,
    timeEffortByEctsHours: number | null = null,
    timeEffortPredictedHours: number | null = null,
    id: string | null = null
  ) {
    this.id = id ?? uuidv4();
    this.title = title;
    this.description = description;
    this.ects = ects;
    this.timeEffortByEctsHours = timeEffortByEctsHours ?? 0;
    this.timeEffortPredictedHours = timeEffortPredictedHours ?? 0;
  }
}

export default Module;
