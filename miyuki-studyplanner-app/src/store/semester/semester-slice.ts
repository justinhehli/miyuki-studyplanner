import { createSlice } from "@reduxjs/toolkit";
import iModule from "../../models/semester/i-module";
import ISemester from "../../models/semester/i-semester";
import Module from "../../models/semester/module";
import Semester from "../../models/semester/semester";

const semester7ModuleTestData = [
  new Module("Biochemistry 1", null, 8, 8 * 30),
  new Module("Biomedicine 2", "This is a biomedicine modulle", 4, 4 * 30, 150),
] as iModule[];

const semesterTestData = [
  new Semester(new Date(2022, 1, 1), new Date(2022, 6, 30), 6, [], null),
  new Semester(new Date(2022, 7, 1), new Date(2022, 12, 31), 7, semester7ModuleTestData, null),
] as ISemester[];

export const semesterSlice = createSlice({
  name: "semesters",
  initialState: {
    semesters: semesterTestData,
  },
  reducers: {},
});

export const {} = semesterSlice.actions;

export default semesterSlice.reducer;
