import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    primary: {
      main: "#6ed6c4",
    },
    secondary: {
      main: "#fdbbaa",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button variant="contained">Hello World</Button>
    </ThemeProvider>
  );
}

export default App;
