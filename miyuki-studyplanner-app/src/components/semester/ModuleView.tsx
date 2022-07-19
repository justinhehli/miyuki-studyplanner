import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IModule from "../../models/semester/i-module";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { useAppDispatch } from "../../store";
import { updateModuleValues } from "../../store/semester/semester-slice";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";

const ModuleView: React.FC<{ module: IModule }> = (props) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const dispatch = useAppDispatch();

  const contentVisibleClickHandler = (_event: React.MouseEvent) => {
    setIsContentVisible((previousValue) => !previousValue);
  };

  const descriptionChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateModuleValues({ ...props.module, description: event.target.value } as IModule));
  };

  const ectsChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateModuleValues({ ...props.module, ects: Number(event.target.value) }));
  };

  const timeEffortPredictedChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateModuleValues({ ...props.module, timeEffortPredictedHours: Number(event.target.value) }));
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
      {isContentVisible && props.module.title != null && (
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="standard"
                size="small"
                multiline
                fullWidth
                value={props.module.description ?? ""}
                onChange={descriptionChangeHandler}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="ECTS"
                variant="standard"
                type="number"
                size="small"
                value={props.module.ects}
                onChange={ectsChangeHandler}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Time effort by ECTS (hours)"
                variant="standard"
                type="number"
                size="small"
                disabled
                value={props.module.timeEffortByEctsHours}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Time effort predicted (hours)"
                variant="standard"
                type="number"
                size="small"
                value={props.module.timeEffortPredictedHours}
                onChange={timeEffortPredictedChangeHandler}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      )}
    </Card>
  );
};

export default ModuleView;
