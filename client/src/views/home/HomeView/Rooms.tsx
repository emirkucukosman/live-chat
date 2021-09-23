import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  Link,
  makeStyles,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { MeetingRoom } from "@material-ui/icons";
import { useReduxSelector } from "src/app/hook";
import { selectRooms, selectFetchRoomsStatus } from "src/slices/roomSlice";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 16,
    marginBottom: theme.spacing(3),
  },
}));

const Rooms = () => {
  const rooms = useReduxSelector(selectRooms);
  const fetchRoomsStatus = useReduxSelector(selectFetchRoomsStatus);
  const classes = useStyles();

  if (fetchRoomsStatus === "loading") {
    return (
      <Box mt={2}>
        <CircularProgress />
      </Box>
    );
  }

  if (fetchRoomsStatus === "success" && rooms.length === 0) {
    return (
      <Box mt={2}>
        <Typography variant="body2" color="error">
          There are no rooms available at the moment.
        </Typography>
        <Typography variant="body2">
          You can create one by clicking the plus button at the bottom right corner.
        </Typography>
      </Box>
    );
  }

  return (
    <Box mt={2}>
      {rooms &&
        rooms.map((room, i) => (
          <Card className={classes.card} key={i}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" flexDirection="column">
                <Typography>{room.name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {room.creator}
                </Typography>
              </Box>
              <Link component={RouterLink} to={`/room/chat/${room.name}`} underline="none">
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  startIcon={<MeetingRoom />}
                >
                  Join
                </Button>
              </Link>
            </Box>
          </Card>
        ))}
    </Box>
  );
};

export default Rooms;
