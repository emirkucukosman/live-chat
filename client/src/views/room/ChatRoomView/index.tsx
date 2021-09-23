import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Redirect, useParams } from "react-router-dom";
import { Container, makeStyles } from "@material-ui/core";
import { useReduxDispatch, useReduxSelector } from "src/app/hook";
import { fetchRoomDetails, clearSuccess, selectFetchRoomDetailsStatus } from "src/slices/roomSlice";
import { selectError, clearErrors } from "src/slices/errorSlice";
import SendMessage from "./SendMessage";
import WelcomeMessage from "./WelcomeMessage";
import MessageBox from "./MessageBox";
import UserAction from "./UserAction";
import LoadingScreen from "src/components/LoadingScreen";
import SocketManager from "src/utils/socket";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100vh",
  },
  chatBox: {
    flexGrow: 1,
    border: "1px solid lightgray",
    borderRadius: 6,
    marginTop: theme.spacing(2),
  },
}));

const ChatRoomView = () => {
  const dispatch = useReduxDispatch();
  const fetchRoomDetailsStatus = useReduxSelector(selectFetchRoomDetailsStatus);
  const error = useReduxSelector(selectError);
  const classes = useStyles();
  const { room } = useParams() as any;
  const socketManager = SocketManager.getInstance;
  const chatBoxRef = React.createRef<HTMLDivElement>();

  const appendChildToChatBox = (element: HTMLElement) => {
    chatBoxRef.current?.appendChild(element);
  };

  useEffect(() => {
    dispatch(clearSuccess());
    dispatch(fetchRoomDetails(room));

    return () => {
      socketManager.closeConnection();
      dispatch(clearSuccess());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fetchRoomDetailsStatus === "success") {
      socketManager.openConnection();

      socketManager.emitEvent("join room", room);

      socketManager.listenEvent("new message", ({ name, message }: any) => {
        const messageDiv = document.createElement("div");
        const messageBox = <MessageBox name={name} message={message} />;
        ReactDOM.render(messageBox, messageDiv);
        appendChildToChatBox(messageDiv);
      });

      socketManager.listenEvent("user joined", (message: any) => {
        const messageDiv = document.createElement("div");
        const userJoinedBox = <UserAction message={message} type="join" />;
        ReactDOM.render(userJoinedBox, messageDiv);
        appendChildToChatBox(messageDiv);
      });

      socketManager.listenEvent("user left", (message: any) => {
        const messageDiv = document.createElement("div");
        const userLeftBox = <UserAction message={message} type="leave" />;
        ReactDOM.render(userLeftBox, messageDiv);
        appendChildToChatBox(messageDiv);
      });

      socketManager.listenEvent("error", (error: any) => {
        window.alert(error);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchRoomDetailsStatus]);

  useEffect(() => {
    if (error.id === "FETCH_ROOM_DETAILS_ERROR") {
      window.alert(error.message);
      dispatch(clearErrors());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (fetchRoomDetailsStatus === "loading") {
    return <LoadingScreen />;
  }

  if (fetchRoomDetailsStatus === "fail") {
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <div className={classes.chatBox} ref={chatBoxRef}>
          <WelcomeMessage room={room} />
        </div>
        <SendMessage room={room} />
      </div>
    </Container>
  );
};

export default ChatRoomView;
