import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

export const selectAllSemestersSorted = (state: RootState) =>
  [...state.semester.semesters].sort((a, b) => b.index - a.index);

export const selectModulesBySemesterId = (semesterId: string) => {
  return createSelector([selectAllSemestersSorted], (semesters) => {
    const semester = semesters.find((s) => s.id === semesterId);
    return semester != null ? semester.modules : null;
  });
};
