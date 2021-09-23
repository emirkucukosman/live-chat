import React from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button, makeStyles } from "@material-ui/core";
import { ExitToApp, Send } from "@material-ui/icons";
import SocketManager from "src/utils/socket";

const useStyles = makeStyles((theme) => ({
  messageBox: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  nameField: {
    flex: 2,
  },
  messageField: {
    flex: 7,
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
      marginTop: theme.spacing(2),
    },
  },
  sendButton: {
    flex: 1,
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
      marginTop: theme.spacing(2),
      width: "100%",
    },
  },
  leaveButton: {
    flex: 1,
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
      marginTop: theme.spacing(1),
      width: "100%",
    },
  },
}));

interface SendMessageProps {
  room: string;
}

const SendMessage: React.FC<SendMessageProps> = ({ room }) => {
  const classes = useStyles();
  const history = useHistory();
  const [message, setMessage] = React.useState("");
  const [name, setName] = React.useState("");
  const socketManager = SocketManager.getInstance;

  const handleSendMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message || !name) return window.alert("Please enter a name and message.");
    if (message.length > 140 || name.length > 140) {
      return window.alert("Name and message can be maximum of 255 characters.");
    }

    socketManager.emitEvent("send message", { name, message, room });
    setMessage("");
  };

  const handleLeaveRoomClick = () => {
    socketManager.closeConnection();
    history.replace("/");
  };

  return (
    <form onSubmit={handleSendMessageSubmit} className={classes.messageBox} noValidate>
      <TextField
        label="Name"
        variant="filled"
        size="small"
        fullWidth
        value={name}
        className={classes.nameField}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Message"
        variant="filled"
        size="small"
        fullWidth
        value={message}
        className={classes.messageField}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        color="primary"
        variant="contained"
        startIcon={<Send />}
        type="submit"
        className={classes.sendButton}
      >
        SEND
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        startIcon={<ExitToApp />}
        type="button"
        className={classes.leaveButton}
        onClick={handleLeaveRoomClick}
      >
        LEAVE
      </Button>
    </form>
  );
};

export default SendMessage;
