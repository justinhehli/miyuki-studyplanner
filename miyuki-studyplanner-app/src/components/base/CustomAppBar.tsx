import { styled } from "@mui/material/styles";
import React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { sideDrawerWidth } from "./SideDrawer";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${sideDrawerWidth}px)`,
    marginLeft: `${sideDrawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const styles = {
  white: {
    color: "#ffffff",
  },
};

const CustomAppBar: React.FC<{
  isSideDrawerOpen: boolean;
  onDrawerOpen: () => void;
}> = (props) => {
  return (
    <AppBar position="fixed" open={props.isSideDrawerOpen}>
      <Toolbar variant="dense">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.onDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...styles.white, ...(props.isSideDrawerOpen && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" fontWeight="lighter" sx={styles.white}>
          Miyuky Study Planner
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
