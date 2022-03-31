import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import SideDrawer, { DrawerHeader, sideDrawerWidth } from "./components/base/SideDrawer";
import Box from "@mui/material/Box";
import CustomAppBar from "./components/base/CustomAppBar";

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

  const handleDrawerOpen = () => {
    setIsSideDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsSideDrawerOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <CustomAppBar isSideDrawerOpen={isSideDrawerOpen} onDrawerOpen={handleDrawerOpen} />
        <SideDrawer isOpen={isSideDrawerOpen} onDrawerClose={handleDrawerClose} />
        <Main open={isSideDrawerOpen}>
          <DrawerHeader />
        </Main>
      </Box>
    </ThemeProvider>
  );
}

export default App;
