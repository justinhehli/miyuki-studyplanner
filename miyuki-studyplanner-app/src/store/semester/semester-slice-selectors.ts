import { RootState } from "..";

export const selectAllSemestersSorted = (state: RootState) =>
  [...state.semester.semesters].sort((a, b) => a.index - b.index);

export const selectModulesBySemesterId = (state: RootState, semesterId: string) => {
  const semester = state.semester.semesters.find((s) => s.id === semesterId);
  return semester != null ? semester.modules : null;
};
