import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Semester from "../../models/semester";

const semesterData = [
  new Semester(new Date(2022, 1, 1), new Date(2022, 6, 30), 6),
  new Semester(new Date(2022, 7, 1), new Date(2022, 12, 31), 7),
].sort((a, b) => a.index - b.index);

const styles = {
  centeredContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingCenteredPagination: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, 0)",
    bottom: 0,
    mb: 2,
  },
};

const SemestersPage: React.FC = () => {
  const [page, setPage] = useState(() => {
    const currentSemIndex = semesterData.findIndex((s) => s.isCurrentSemester());
    return currentSemIndex !== -1 ? currentSemIndex + 1 : semesterData.length > 1 ? 0 : undefined;
  });

  const paginationChangeHandler = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (semesterData.length === 0) {
    return <Typography>no semesters yet</Typography>;
  }

  return (
    <Container sx={styles.centeredContainer}>
      <Pagination
        count={semesterData.length}
        page={page}
        size="small"
        onChange={paginationChangeHandler}
        sx={styles.floatingCenteredPagination}
      />
    </Container>
  );
};

export default SemestersPage;
