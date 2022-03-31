import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";

export const sideDrawerWidth = 240;
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const SideDrawer: React.FC<{ isOpen: boolean; onDrawerClose: () => void }> = (props) => {
  return (
    <Drawer
      sx={{
        width: sideDrawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sideDrawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={props.isOpen}
    >
      <DrawerHeader>
        <IconButton onClick={props.onDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem button key={"Dashboard"}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideDrawer;
