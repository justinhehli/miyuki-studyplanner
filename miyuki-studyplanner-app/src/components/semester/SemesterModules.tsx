import React from "react";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../store";
import { selectModulesBySemesterId } from "../../store/semester/semester-slice-selectors";
import ModuleView from "./ModuleView";
import Box from "@mui/material/Box";

const styles = {
  modulesContainer: {
    display: "flex",
    flexFlow: "column nowrap",
    gap: 1,
  },
};

const SemesterModules: React.FC<{ semesterId: string }> = (props) => {
  const modules = useAppSelector(selectModulesBySemesterId(props.semesterId));

  if (modules == null || modules.length === 0) {
    return <Typography>No modules yet</Typography>;
  }

  return (
    <Box sx={styles.modulesContainer}>
      {modules.map((m) => (
        <ModuleView module={m} />
      ))}
    </Box>
  );
};

export default SemesterModules;
