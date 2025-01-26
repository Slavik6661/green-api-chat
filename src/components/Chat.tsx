import { FC, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import UserSidebar from "./UserSidebar";
import ChatsPanel from "./ChatsPanel";
import MessageList from "./MessageList";
import { useChatContext } from "./ChatContext";

const Chat: FC = () => {
  const { idInstance, apiTokenInstance, chat, setChat, setSelectedChat } =
    useChatContext();

  const receiveMessage = async () => {
    const url = `https://1103.api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;

    try {
      const response = await axios.get(url);

      if (response.data && response.data.body) {
        const notification = response.data;

        if (notification.body.messageData.typeMessage === "textMessage") {
          const messageText =
            notification.body.messageData.textMessageData.textMessage;
          const senderPhoneNumber = notification.body.senderData.sender
            .replace("@c.us", "")
            .toString();

          const existingChat = chat.find(
            (chatRoom) => chatRoom.id === senderPhoneNumber
          );

          if (existingChat) {
            const updatedChat = {
              ...existingChat,
              messages: [
                ...(existingChat.messages ?? []),
                {
                  id: Date.now().toString(),
                  message: messageText,
                  isSent: false,
                  time: new Date().toLocaleTimeString(),
                },
              ],
            };

            setSelectedChat(updatedChat);
            setChat((prevChat: any[]) =>
              prevChat.map((chatRoom) =>
                chatRoom.id === existingChat.id ? updatedChat : chatRoom
              )
            );
          } else {
            const newChat = {
              id: senderPhoneNumber,
              avatar: "",
              name: "",
              phoneNumber: senderPhoneNumber,
              messages: [
                {
                  id: Date.now().toString(),
                  message: messageText,
                  isSent: true,
                  time: new Date().toLocaleTimeString(),
                },
              ],
            };

            setSelectedChat(newChat);
            setChat((prevChat: any) => [...prevChat, newChat]);
          }

          await axios.delete(
            `https://1103.api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${notification.receiptId}`
          );
        } else {
          await axios.delete(
            `https://1103.api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${notification.receiptId}`
          );
        }
      }
    } catch (error) {
      console.error("Ошибка получения сообщения:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(receiveMessage, 2000);
    return () => clearInterval(interval);
  }, [idInstance, apiTokenInstance, chat]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#262524",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "85vw",
          height: "85vh",
        }}
      >
        <UserSidebar />
        <ChatsPanel />
        <MessageList />
      </Box>
    </Box>
  );
};

export default Chat;
