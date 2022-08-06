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
import { deleteModuleById, updateModuleValues } from "../../store/semester/semester-slice";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { ColorResult, TwitterPicker } from "react-color";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const NoBackgroundTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(0,0,0,0)",
    boxShadow: theme.shadows[1],
  },
}));

const ModuleAvatar: React.FC<{ module: IModule }> = (props) => {
  const dispatch = useAppDispatch();

  const colorChangeCompleteHandler = (color: ColorResult) => {
    dispatch(updateModuleValues({ ...props.module, color: color.hex }));
  };

  const twitterPicker = <TwitterPicker color={props.module.color} onChangeComplete={colorChangeCompleteHandler} />;

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <NoBackgroundTooltip title={twitterPicker} placement="bottom-start">
        <Avatar sx={{ bgcolor: props.module.color }}>{(props.module.title[0] ?? "?").toUpperCase()}</Avatar>
      </NoBackgroundTooltip>
    </div>
  );
};

const ModuleView: React.FC<{ module: IModule }> = (props) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const dispatch = useAppDispatch();

  const contentVisibleClickHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsContentVisible((previousValue) => !previousValue);
  };

  const cardHeaderClickHandler = (_event: React.MouseEvent) => {
    setIsContentVisible((previousValue) => !previousValue);
  };

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateModuleValues({ ...props.module, title: event.target.value } as IModule));
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

  const deleteModuleClickHandler = (_event: React.MouseEvent) => {
    dispatch(deleteModuleById(props.module.id));
  };

  return (
    <Card>
      <CardHeader
        title={props.module.title}
        subheader={`${props.module.ects} ECTS`}
        avatar={<ModuleAvatar module={props.module} />}
        action={
          <IconButton onClick={contentVisibleClickHandler}>
            {!isContentVisible ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </IconButton>
        }
        onClick={cardHeaderClickHandler}
      />
      {isContentVisible && props.module.title != null && (
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                variant="standard"
                size="small"
                multiline
                fullWidth
                value={props.module.title}
                onChange={titleChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description, Notes, ..."
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
            <Grid item xs={12}>
              <Button variant="outlined" color="secondary" onClick={deleteModuleClickHandler}>
                Delete Module
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      )}
    </Card>
  );
};

export default ModuleView;
