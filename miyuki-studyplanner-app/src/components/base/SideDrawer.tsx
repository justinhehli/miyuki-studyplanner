import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ListItemText from "@mui/material/ListItemText";
import { useAppSelector } from "../../store";
import { selectAllSemestersSorted } from "../../store/semester/semester-slice-selectors";
import Collapse from "@mui/material/Collapse";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

export const sideDrawerWidth = 240;
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const styles = {
  drawer: {
    width: sideDrawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: sideDrawerWidth,
      boxSizing: "border-box",
    },
  },
};

const SideDrawer: React.FC<{ isOpen: boolean; onDrawerClose: () => void }> = (props) => {
  const semesters = useAppSelector((state) => selectAllSemestersSorted(state));

  const navigate = useNavigate();

  const semesterClickHandler = (semesterId: string) => {
    navigate(`/semesters/${semesterId}`);
  };

  const homeClickHandler = (_event: React.MouseEvent) => {
    navigate("/");
  };

  return (
    <Drawer sx={{ ...styles.drawer }} variant="persistent" anchor="left" open={props.isOpen}>
      <DrawerHeader>
        <IconButton onClick={props.onDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List component="nav">
        {[{ key: "Home", icon: DashboardIcon }].map((i) => (
          <ListItemButton key={i.key} onClick={homeClickHandler}>
            <ListItemIcon>
              <i.icon />
            </ListItemIcon>
            <ListItemText primary={i.key} />
          </ListItemButton>
        ))}

        <ListItemButton>
          <ListItemIcon>
            <CalendarMonthIcon />
          </ListItemIcon>
          <ListItemText primary="Semesters" />
        </ListItemButton>
        <Collapse in={true} unmountOnExit>
          <List component="div" disablePadding dense>
            {semesters.map((s) => (
              <MenuItem key={s.id}>
                <ListItemButton onClick={(_event: React.MouseEvent) => semesterClickHandler(s.id)}>
                  <ListItemText primary={`Semester ${s.index}`} />
                </ListItemButton>
              </MenuItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default SideDrawer;
