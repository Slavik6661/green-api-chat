import { FC } from "react";
import { ListItem, ListItemText } from "@mui/material";
import { IMessage } from "../types/types";

const Message: FC<IMessage> = ({ user, message, time, isSent }) => {
  return (
    <ListItem sx={{ justifyContent: isSent ? "flex-end" : "flex-start" }}>
      <ListItemText
        primary={message}
        secondary={`${user}, ${time}`}
        sx={{
          bgcolor: isSent ? "#dcf8c6" : "#ece5dd",
          p: 1,
          borderRadius: 1,
          maxWidth: "70%",
        }}
      />
    </ListItem>
  );
};

export default Message;
