import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store";
import { selectAllSemestersSorted } from "../../store/semester/semester-slice-selectors";
import SingleSemester from "./SingleSemester";

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
  const [page, setPage] = useState<number | null>(null);

  const semesters = useAppSelector((state) => selectAllSemestersSorted(state));

  useEffect(() => {
    if (page == null && semesters.length !== 0) {
      setPage(semesters.length);
    }
  }, [page, semesters.length]);

  const paginationChangeHandler = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (semesters.length === 0) {
    return <Typography>no semesters yet</Typography>;
  }
  if (page == null) {
    return <Typography>no semester selected</Typography>;
  }

  return (
    <Container sx={styles.centeredContainer}>
      {
        // use array.map() instead of determining selected semester in a separate const to enable pagination animation
        semesters.map((s, i) => {
          if (i === page! - 1) {
            return <SingleSemester semester={s} />;
          }

          return null;
        })
      }

      <Pagination
        count={semesters.length}
        page={page}
        size="small"
        onChange={paginationChangeHandler}
        sx={styles.floatingCenteredPagination}
      />
    </Container>
  );
};

export default SemestersPage;
