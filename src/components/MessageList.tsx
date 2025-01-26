import { FC } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useChatContext } from "./ChatContext";
import PersonIcon from "@mui/icons-material/Person";
import BackgroundImage from "../assets/background.png";
const MessageList: FC = () => {
  const { selectedChat, newMessage, setNewMessage, sendMessage } =
    useChatContext();

  if (!selectedChat) {
    return (
      <Box
        sx={{
          flex: 2,
          borderRadius: "0 5px 5px 0",
          backgroundColor: "#222e35",
        }}
      >
        <Typography variant="h5" align="center" fontStyle="bold" color="white">
          Выберите чат
        </Typography>
      </Box>
    );
  }

  const { messages } = selectedChat;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100%", flex: 4 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",

          height: "max-content",
          paddingLeft: "10px",

          backgroundColor: "#222e35", // Фон, чтобы текст не накладывался на сообщения
        }}
      >
        <Box>
          {selectedChat.avatar ? (
            <img
              src={selectedChat.avatar}
              alt="Avatar"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          ) : (
            <PersonIcon fontSize="large" />
          )}
        </Box>
        <Typography
          variant="h5"
          align="left"
          fontStyle="bold"
          color="white"
          sx={{ padding: "10px" }}
        >
          Чат с {selectedChat.phoneNumber}
        </Typography>
      </Box>
      <Box
        component="image"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          flex: 2,
          borderRadius: "0 5px 5px 0",
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
        }}
      >
        <List
          sx={{
            maxHeight: "670px",
            overflowY: "auto",

            borderRadius: "5px",
            padding: "5px",
            display: messages.length <= 0 ? "none" : "block",
          }}
        >
          {messages &&
            messages.map((message) => (
              <ListItem
                key={message.id}
                sx={{
                  justifyContent: message.isSent ? "flex-end" : "flex-start",
                }}
              >
                <ListItemText
                  primary={message.message}
                  secondary={message.time}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: message.isSent ? "flex-end" : "flex-start",
                    bgcolor: message.isSent ? "#dcf8c6" : "#ece5dd",
                    p: 1,
                    borderRadius: 1,
                    maxWidth: "max-content",
                  }}
                />
              </ListItem>
            ))}
        </List>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            padding: "10px",
          }}
        >
          <TextField
            // label="Введите сообщение"/
            value={newMessage}
            sx={{
              border: "1px solid #fff",
              borderRadius: "5px",
            }}
            onChange={(e) => setNewMessage(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={sendMessage}>
            Отправить
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default MessageList;
