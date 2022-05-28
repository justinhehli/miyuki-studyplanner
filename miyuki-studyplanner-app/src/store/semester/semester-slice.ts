import { createSlice } from "@reduxjs/toolkit";
import ISemester from "../../models/semester/i-semester";
import Semester from "../../models/semester/semester";

const semesterTestData = [
  new Semester(new Date(2022, 1, 1), new Date(2022, 6, 30), 6, [], null),
  new Semester(new Date(2022, 7, 1), new Date(2022, 12, 31), 7, [], null),
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
