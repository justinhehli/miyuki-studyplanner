import React from "react";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectModulesBySemesterId } from "../../store/semester/semester-slice-selectors";
import ModuleView from "./ModuleView";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { addModuleToSemesterById } from "../../store/semester/semester-slice";

const styles = {
  modulesContainer: {
    display: "flex",
    flexFlow: "column nowrap",
    gap: 1,
  },
};

const SemesterModules: React.FC<{ semesterId: string }> = (props) => {
  const dispatch = useAppDispatch();
  const modules = useAppSelector(selectModulesBySemesterId(props.semesterId));

  const addModuleClickHandler = (event: React.MouseEvent) => {
    dispatch(addModuleToSemesterById(props.semesterId));
  };

  return (
    <React.Fragment>
      {(modules == null || modules.length === 0) && <Typography>No modules yet</Typography>}
      <Box sx={styles.modulesContainer}>
        {(modules ?? []).map((m) => (
          <ModuleView key={m.id} module={m} />
        ))}
        <Button variant="text" sx={{ alignSelf: "flex-start" }} onClick={addModuleClickHandler}>
          + Add Module
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default SemesterModules;
