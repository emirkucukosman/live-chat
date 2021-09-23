import React from "react";
import { Typography } from "@material-ui/core";
import { PersonOutlineRounded } from "@material-ui/icons";
import dayjs from "dayjs";

interface MessageBoxProps {
  name: string;
  message: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ name, message }) => {
  return (
    <div className="messageDiv">
      <div>
        <PersonOutlineRounded />
        <Typography style={{ marginLeft: 12 }}>
          <strong>{name}</strong>: &nbsp;
        </Typography>
        <Typography>{message}</Typography>
      </div>
      <Typography variant="caption">{dayjs().format("HH:mm")}</Typography>
    </div>
  );
};

export default MessageBox;
