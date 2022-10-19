import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CustomAppBar from "./components/base/CustomAppBar";
import SideDrawer, { DrawerHeader, sideDrawerWidth } from "./components/base/SideDrawer";
import type {} from "@mui/lab/themeAugmentation";
import SemesterView from "./components/semester/SemesterView";
import StartingPage from "./components/starting-page/StartingPage";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect } from "react";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    primary: {
      main: "#00a9ad",
    },
    secondary: {
      main: "#fdbbaa",
    },
  },
  components: {
    MuiTimeline: {
      styleOverrides: {
        root: {
          backgroundColor: "red",
        },
      },
    },
  },
});

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${sideDrawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

function App() {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  useEffect(() => {
    (async function () {
      const { text } = await (await fetch(`/api/HttpTrigger1`)).json();
      console.log(text);
    })();
  });

  const handleDrawerOpen = () => {
    setIsSideDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsSideDrawerOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <CustomAppBar isSideDrawerOpen={isSideDrawerOpen} onDrawerOpen={handleDrawerOpen} />
          <SideDrawer isOpen={isSideDrawerOpen} onDrawerClose={handleDrawerClose} />
          <Main open={isSideDrawerOpen}>
            <DrawerHeader />
            <Routes>
              <Route index element={<StartingPage />} />
              <Route path="semesters/:semesterId" element={<SemesterView />} />
            </Routes>
          </Main>
        </Box>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
