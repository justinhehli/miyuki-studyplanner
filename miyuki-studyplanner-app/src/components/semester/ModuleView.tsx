import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IModule from "../../models/semester/i-module";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";

const ModuleView: React.FC<{ module: IModule }> = (props) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const contentVisibleClickHandler = (_event: React.MouseEvent) => {
    setIsContentVisible((previousValue) => !previousValue);
  };

  return (
    <Card>
      <CardHeader
        title={props.module.title}
        subheader={`${props.module.ects} ECTS`}
        avatar={<Avatar>{props.module.title[0].toUpperCase()}</Avatar>}
        action={
          <IconButton onClick={contentVisibleClickHandler}>
            {!isContentVisible ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </IconButton>
        }
      />
      {isContentVisible && <CardContent>asdf</CardContent>}
    </Card>
  );
};

export default ModuleView;
