import { FC, useState, FormEvent } from "react";
import { Box, TextField, Button, Container } from "@mui/material";
import Chat from "./components/Chat";
import { ChatProvider } from "./components/ChatContext";

const App: FC = () => {
  const [isAunthenticated, setIsAuthenticated] = useState(false);
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (idInstance && apiTokenInstance) {
      setIsAuthenticated(true);
    }
  };
  return (
    <ChatProvider idInstance={idInstance} apiTokenInstance={apiTokenInstance}>
      <Container
        sx={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          {!isAunthenticated ? (
            <Box
              component="form"
              onSubmit={handleLogin}
              sx={{
                display: "flex",
                width: "450px",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="IdInstance"
                variant="outlined"
                type="text"
                value={idInstance}
                onChange={(e) => setIdInstance(e.target.value)}
              />
              <TextField
                label="ApiTokenInstance"
                variant="outlined"
                type="password"
                value={apiTokenInstance}
                onChange={(e) => setApiTokenInstance(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </Box>
          ) : (
            <Chat />
          )}
        </Box>
      </Container>
    </ChatProvider>
  );
};

export default App;
