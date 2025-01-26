import { FC, ReactNode, createContext, useContext, useState } from "react";
import { IChat } from "../types/types";
import axios from "axios";

interface ChatProviderProps {
  children: ReactNode;
  idInstance: string;
  apiTokenInstance: string;
}

interface ChatContextType {
  idInstance: string;
  apiTokenInstance: string;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  newMessage: string;
  setNewMessage: (message: string) => void;
  chat: IChat[];
  setChat: (chat: any) => void;
  selectedChat: IChat | null;
  setSelectedChat: (chat: IChat | null) => void;
  sendMessage: () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider: FC<ChatProviderProps> = ({
  children,
  idInstance,
  apiTokenInstance,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [chat, setChat] = useState<IChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);

  const sendMessage = async () => {
    console.log("Sending message with:", { newMessage, phoneNumber });
    if (!newMessage || !phoneNumber) return console.log("no message");

    const url = `https://1103.api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    const payload = {
      chatId: `${phoneNumber.replace(/\D/g, "")}@c.us`,
      message: newMessage,
    };
    try {
      await axios.post(url, payload);

      if (selectedChat) {
        const udatedChat = {
          ...selectedChat,
          messages: [
            ...(selectedChat.messages ?? []),
            {
              id: Date.now().toString(),
              message: newMessage,
              isSent: true,
              time: new Date().toLocaleTimeString(),
            },
          ],
        };

        setChat((prevChat: any) =>
          prevChat.map((chat: any) =>
            chat.id === selectedChat.id ? udatedChat : chat
          )
        );
        setSelectedChat(udatedChat);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Ошибка отправки сообщения:", error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        idInstance,
        apiTokenInstance,
        phoneNumber,
        setPhoneNumber,
        newMessage,
        setNewMessage,
        chat,
        setChat,
        selectedChat,
        setSelectedChat,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
