interface IModule {
  id: string;
  title: string;
  description: string | null;
  ects: number;
  timeEffortByEctsHours: number;
  timeEffortPredictedHours: number;
}

export default IModule;
