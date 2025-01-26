import { FC, useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SearchField from "./SearchField";
import { useChatContext } from "./ChatContext";

const ChatsPanel: FC = () => {
  const { phoneNumber, setPhoneNumber, chat, setChat, setSelectedChat } =
    useChatContext();

  const [isOpenModsal, setIsOpenModsal] = useState(false);

  const handleCreateChat = () => {
    if (phoneNumber.length !== 11) {
      alert("Введите номер телефона в формате 7хххххххххх");
      return;
    }

    const existingChat = chat.find((c) => c.id === phoneNumber);

    if (existingChat) {
      alert("Чат с таким номером уже существует");
      return;
    }

    const newChat = {
      id: phoneNumber,
      avatar: "",
      name: "",
      phoneNumber: phoneNumber,
      messages: [],
    };
    setChat((prevChat: any) => [...prevChat, newChat]);
    setIsOpenModsal(false);
    setPhoneNumber(phoneNumber);
  };

  const handleSearch = (query: string) => {
    console.log("Поиск выполнен:", query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCreateChat();
    }
    if (e.key === "Escape") {
      setIsOpenModsal(false);
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: "#111b21",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "flex-start", padding: "30px" }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ color: "#fff", fontWeight: "bold" }}
        >
          Чаты
        </Typography>
      </Box>

      <Box>
        <SearchField
          placeholder="Введите запрос..."
          onSearch={handleSearch}
          sx={{ maxWidth: 500, margin: "0 auto" }}
        />
      </Box>

      <List
        sx={{
          display: "flex",
          maxHeight: "595px",
          overflowY: "auto",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {chat.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              width: "95%",
              borderBottom: "solid 1px #bfbfbf",
              padding: "20px",
              ":hover": {
                cursor: "pointer",
                backgroundColor: "#222e35",
              },
            }}
            onClick={() => setSelectedChat(item)}
          >
            <PersonIcon fontSize="large" />

            <Typography color="#fff">{"+" + item.phoneNumber}</Typography>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          justifyContent: "center",
          padding: "30px",
          display: isOpenModsal ? "none" : "flex",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsOpenModsal(true)}
        >
          Создать чат
        </Button>
      </Box>
      {isOpenModsal && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "30px",
            }}
          >
            <Typography variant="h5" align="center" sx={{ color: "#fff" }}>
              Создать чат {phoneNumber}
            </Typography>
            <TextField
              label="Введите номер телефона"
              type="tel"
              autoFocus
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onKeyDown={handleKeyPress}
              fullWidth
              sx={{
                color: "#fff",
                "& .MuiInputLabel-root": {
                  color: "#fff", // Цвет метки
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#fff",
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#fff",
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                padding: "10px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateChat}
              >
                Создать чат
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsOpenModsal(false)}
              >
                отмена
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
export default ChatsPanel;
