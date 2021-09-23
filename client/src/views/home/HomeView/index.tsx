import React, { useEffect } from "react";
import { useReduxDispatch } from "src/app/hook";
import { fetchRooms } from "src/slices/roomSlice";
import { Container, makeStyles, Typography } from "@material-ui/core";
import CreateRoomButton from "src/components/CreateRoomButton";
import Rooms from "./Rooms";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  card: {
    padding: 16,
    marginBottom: theme.spacing(3),
  },
}));

const HomeView = () => {
  const dispatch = useReduxDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchRooms());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Typography variant="h4">LiveChat</Typography>
        <Rooms />
      </Container>
      <CreateRoomButton />
    </div>
  );
};

export default HomeView;
