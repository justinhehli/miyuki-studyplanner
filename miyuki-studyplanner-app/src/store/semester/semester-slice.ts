import { v4 as uuidv4 } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IModule from "../../models/semester/i-module";
import ISemester from "../../models/semester/i-semester";

const semester6ModuleTestData = [
  {
    id: uuidv4(),
    title: "Biochemistry 1",
    description: null,
    ects: 8,
    timeEffortByEctsHours: 8 * 30,
    timeEffortPredictedHours: 8 * 30,
  },
  {
    id: uuidv4(),
    title: "Medicine 2",
    description: "This is a biomedicine module",
    ects: 4,
    timeEffortByEctsHours: 4 * 30,
    timeEffortPredictedHours: 4 * 30,
  },
] as IModule[];

const semesterTestData = [
  {
    id: uuidv4(),
    startDateStr: new Date(2022, 1, 1).toDateString(),
    endDateStr: new Date(2022, 6, 30).toDateString(),
    index: 6,
    modules: semester6ModuleTestData,
  },
  {
    id: uuidv4(),
    startDateStr: new Date(2022, 7, 1).toDateString(),
    endDateStr: new Date(2022, 12, 31).toDateString(),
    index: 7,
    modules: [],
  },
] as ISemester[];

export const semesterSlice = createSlice({
  name: "semesters",
  initialState: {
    semesters: semesterTestData,
  },
  reducers: {
    updateSemesterValues(state, action: PayloadAction<ISemester>) {
      const semester = state.semesters.find((s) => s.id === action.payload.id);
      if (
        semester != null &&
        !state.semesters.some(
          (s) =>
            s.id !== semester.id &&
            (s.index === action.payload.index ||
              s.startDateStr === action.payload.startDateStr ||
              s.startDateStr === action.payload.endDateStr ||
              s.endDateStr === action.payload.endDateStr ||
              s.endDateStr === action.payload.startDateStr)
        )
      ) {
        semester.endDateStr = action.payload.endDateStr;
        semester.startDateStr = action.payload.startDateStr;
        semester.index = action.payload.index;
      }
    },
    updateModuleValues(state, action: PayloadAction<IModule>) {
      const module = state.semesters.flatMap((s) => s.modules).find((m) => m.id === action.payload.id);
      if (module != null) {
        module.description = action.payload.description;
        module.ects = action.payload.ects;
        module.timeEffortByEctsHours = action.payload.ects * 30;
        module.timeEffortPredictedHours = action.payload.timeEffortPredictedHours;
        module.title = action.payload.title;
      }
    },
  },
});

export const { updateModuleValues, updateSemesterValues } = semesterSlice.actions;

export default semesterSlice.reducer;
