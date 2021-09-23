import React from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Box, Typography, makeStyles } from "@material-ui/core";
import { useReduxDispatch } from "src/app/hook";
import { createRoom } from "src/slices/roomSlice";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
}));

const Form = () => {
  const dispatch = useReduxDispatch();
  const classes = useStyles();
  const [username, setUsername] = React.useState("");
  const [roomName, setRoomName] = React.useState("");
  const [roomPassword, setRoomPassword] = React.useState("");

  const handleCreateRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createRoom({ name: roomName, creator: username, password: roomPassword }));
  };

  return (
    <form onSubmit={handleCreateRoomSubmit} noValidate>
      <TextField
        variant="outlined"
        label="Username"
        margin="normal"
        type="text"
        value={username}
        fullWidth
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextField
        variant="outlined"
        label="Room Name"
        margin="normal"
        type="text"
        value={roomName}
        fullWidth
        onChange={(e) => setRoomName(e.target.value)}
        required
      />
      <TextField
        variant="outlined"
        label="Room Password"
        margin="normal"
        type="password"
        value={roomPassword}
        fullWidth
        onChange={(e) => setRoomPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        className={classes.button}
      >
        Create Room
      </Button>
      <Box mt={1}>
        <Typography variant="body2">
          Or browse rooms <Link to="/">here</Link>
        </Typography>
      </Box>
    </form>
  );
};

export default Form;
