import React from "react";
import { Typography } from "@material-ui/core";
import { EmojiPeople } from "@material-ui/icons";
import dayjs from "dayjs";

interface WelcomeMessageProps {
  room: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ room }) => {
  return (
    <div className="systemMessageDiv">
      <div>
        <EmojiPeople />
        <Typography style={{ marginLeft: 12, fontStyle: "italic" }}>
          Welcome to room <strong>{room}</strong>
        </Typography>
      </div>
      <Typography variant="caption">{dayjs().format("HH:mm")}</Typography>
    </div>
  );
};

export default WelcomeMessage;
