import React from "react";
import { IconButton, Link, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    position: "fixed",
    right: 20,
    bottom: 20,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const CreateRoomButton = () => {
  const classes = useStyles();

  return (
    <Link component={RouterLink} to="/room/create">
      <IconButton className={classes.button}>
        <Add fontSize="large" />
      </IconButton>
    </Link>
  );
};

export default CreateRoomButton;
