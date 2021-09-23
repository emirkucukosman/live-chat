import React from "react";
import { Typography } from "@material-ui/core";
import { PersonAdd, ExitToApp } from "@material-ui/icons";
import dayjs from "dayjs";

interface UserActionProps {
  message: string;
  type: "join" | "leave";
}

const UserAction: React.FC<UserActionProps> = ({ message, type }) => {
  return (
    <div className="systemMessageDiv">
      <div>
        {type === "join" ? <PersonAdd /> : <ExitToApp />}
        <Typography style={{ marginLeft: 12, fontStyle: "italic" }}>{message}</Typography>
      </div>
      <Typography variant="caption">{dayjs().format("HH:mm")}</Typography>
    </div>
  );
};

export default UserAction;
