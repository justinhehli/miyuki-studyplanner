import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import IModule from "../../models/semester/i-module";

export const selectAllSemestersSorted = (state: RootState) =>
  [...state.semester.semesters].sort((a, b) => b.index - a.index);

export const selectSemesterById = (semesterId: string) => {
  return createSelector([selectAllSemestersSorted], (semesters) => {
    return semesters.find((s) => s.id === semesterId) ?? null;
  });
};

export const selectModulesBySemesterId = (semesterId: string) => {
  return createSelector([selectAllSemestersSorted], (semesters) => {
    const semester = semesters.find((s) => s.id === semesterId);
    return semester != null ? semester.modules : null;
  });
};

export const selectModuleById = (semesterId: string, moduleId: string) => {
  return createSelector([selectAllSemestersSorted], (semesters) => {
    if (semesterId === null || moduleId == null) {
      return null;
    }

    const semester = semesters.find((s) => s.id === semesterId);
    return semester?.modules.find((m) => m.id === moduleId) ?? null;
  });
};

export const selectAppointmentsBySemesterId = (semesterId: string) => {
  return createSelector([selectAllSemestersSorted], (semesters) => {
    const semester = semesters.find((s) => s.id === semesterId);
    return semester != null ? semester.appointments : null;
  });
};
