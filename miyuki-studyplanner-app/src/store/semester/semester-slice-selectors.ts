import { RootState } from "..";

export const selectAllSemestersSorted = (state: RootState) =>
  [...state.semester.semesters].sort((a, b) => a.index - b.index);
