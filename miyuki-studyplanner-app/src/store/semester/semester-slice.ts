import { v4 as uuidv4 } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IModule from "../../models/semester/i-module";
import ISemester from "../../models/semester/i-semester";
import IMiyukiAppointmentModel from "../../models/semester/i-miyuki-appointment-model";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";

export const semester7Id = uuidv4();
const semester7Biochemistry1Id = uuidv4();
const semester7ModuleTestData: IModule[] = [
  {
    id: semester7Biochemistry1Id,
    title: "Biochemistry 1",
    description: null,
    ects: 8,
    timeEffortByEctsHours: 8 * 30,
    timeEffortPredictedHours: 8 * 30,
    semesterId: semester7Id,
    color: "green",
  },
  {
    id: uuidv4(),
    title: "Medicine 2",
    description: "This is a biomedicine module",
    ects: 4,
    timeEffortByEctsHours: 4 * 30,
    timeEffortPredictedHours: 4 * 30,
    semesterId: semester7Id,
    color: "red",
  },
];

const semester7ScheduleTestData: IMiyukiAppointmentModel[] = [
  {
    id: uuidv4(),
    startDate: new Date(2022, 8, 24, 12, 0).toISOString(),
    endDate: new Date(2022, 8, 24, 16, 0).toISOString(),
    title: "Some random event",
    semesterId: semester7Id,
    moduleId: null,
  },
  {
    id: uuidv4(),
    startDate: new Date(2022, 8, 25, 12, 0).toISOString(),
    endDate: new Date(2022, 8, 25, 16, 0).toISOString(),
    title: "BioChem1 appointment",
    semesterId: semester7Id,
    moduleId: semester7Biochemistry1Id,
  },
];

const semesterTestData: ISemester[] = [
  {
    id: uuidv4(),
    startDateStr: new Date(2022, 1, 1).toDateString(),
    endDateStr: new Date(2022, 6, 30).toDateString(),
    index: 6,
    modules: [],
    appointments: [],
  },
  {
    id: semester7Id,
    startDateStr: new Date(2022, 7, 1).toDateString(),
    endDateStr: new Date(2022, 12, 31).toDateString(),
    index: 7,
    modules: semester7ModuleTestData.map((m) => ({ ...m, semesterId: semester7Id } as IModule)),
    appointments: semester7ScheduleTestData,
  },
];

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
        appointments: [],
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
        module.color = action.payload.color;
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
    addAppointmentToSemester(state, action: PayloadAction<IMiyukiAppointmentModel>) {
      const semester = state.semesters.find((s) => s.id === action.payload.semesterId);
      if (semester != null) {
        semester.appointments.push(action.payload);
      }
    },
    updateAppointmentValues(state, action: PayloadAction<AppointmentModel>) {
      const semester = state.semesters.find((s) => s.id === action.payload.semesterId);
      const appointment = semester?.appointments.find((a) => a.id === action.payload.id);
      if (appointment != null) {
        appointment.title = action.payload.title;
        appointment.startDate = new Date(action.payload.startDate).toISOString();
        appointment.endDate = action.payload.endDate ? new Date(action.payload.endDate).toISOString() : undefined;
        appointment.rRule = action.payload.rRule;
        appointment.exDate = action.payload.exDate;
      }
    },
    deleteAppointmentById(state, action: PayloadAction<string>) {
      let appointmentIndex = -1;
      let i = 0;
      while (i < state.semesters.length && appointmentIndex === -1) {
        appointmentIndex = state.semesters[i++].appointments.findIndex((a) => a.id === action.payload);
      }

      if (appointmentIndex !== -1) {
        state.semesters[i - 1].appointments.splice(appointmentIndex, 1);
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
  addAppointmentToSemester,
  updateAppointmentValues,
  deleteAppointmentById,
} = semesterSlice.actions;

export default semesterSlice.reducer;
