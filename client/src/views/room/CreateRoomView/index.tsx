import React from "react";
import { Redirect } from "react-router-dom";
import {
  Card,
  CardContent,
  makeStyles,
  Box,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { useReduxSelector } from "src/app/hook";
import { selectCreateRoomStatus, selectCreatedRoom } from "src/slices/roomSlice";
import Form from "./Form";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  card: {
    width: 300,
    padding: "12px 24px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
  },
}));

const CreateRoomView = () => {
  const createRoomStatus = useReduxSelector(selectCreateRoomStatus);
  const createdRoom = useReduxSelector(selectCreatedRoom);
  const classes = useStyles();

  if (createRoomStatus === "success") {
    return <Redirect to={`/room/chat/${createdRoom}`} />;
  }

  return (
    <div className={classes.root}>
      <Box mb={3}>
        <Typography variant="h5">LiveChat</Typography>
      </Box>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          {createRoomStatus !== "loading" ? (
            <Form />
          ) : (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRoomView;
