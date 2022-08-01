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
    addSemester(state) {
      const latestSem = state.semesters.reduce((prev, current) => {
        return prev.index > current.index ? prev : current;
      });

      const newStartDate = new Date(latestSem.endDateStr);
      newStartDate.setDate(newStartDate.getDate() + 1);
      const newEndDate = new Date(newStartDate);
      newEndDate.setDate(newEndDate.getDate() + 1);

      const newSemester = {
        id: uuidv4(),
        startDateStr: newStartDate.toDateString(),
        endDateStr: newEndDate.toDateString(),
        index: latestSem.index + 1,
        modules: [],
      } as ISemester;

      state.semesters.push(newSemester);
    },
    deleteSemesterById(state, action: PayloadAction<string>) {
      state.semesters = state.semesters.filter((s) => s.id !== action.payload);
    },
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
    addModuleToSemesterById(state, action: PayloadAction<string>) {
      const semester = state.semesters.find((s) => s.id === action.payload);
      if (semester == null) {
        return;
      }

      const newModule = {
        id: uuidv4(),
        title: "-",
        description: null,
        ects: 0,
        timeEffortByEctsHours: 0 * 30,
        timeEffortPredictedHours: 0 * 30,
      } as IModule;
      semester.modules.push(newModule);
    },
    deleteModuleById(state, action: PayloadAction<string>) {
      let moduleIndex = -1;
      let i = 0;
      while (i < state.semesters.length && moduleIndex === -1) {
        moduleIndex = state.semesters[i++].modules.findIndex((m) => m.id === action.payload);
      }

      if (moduleIndex !== -1) {
        state.semesters[i - 1].modules.splice(moduleIndex, 1);
      }
    },
  },
});

export const {
  addSemester,
  deleteSemesterById,
  updateSemesterValues,
  addModuleToSemesterById,
  deleteModuleById,
  updateModuleValues,
} = semesterSlice.actions;

export default semesterSlice.reducer;
