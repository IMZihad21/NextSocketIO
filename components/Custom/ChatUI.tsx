import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import io from "socket.io-client";
let socket: any;

const ChatUI: React.FC = () => {
  const router = useRouter();
  const { roomName } = router.query;
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<any>([]);
  const messagesEndRef = React.useRef<null | HTMLDivElement>(null);

  React.useEffect(() => {
    roomName
      ? (socket = io("https://socketioserver-wmz2yik67q-uc.a.run.app/", {
          query: { roomName },
        }))
      : (socket = io("https://socketioserver-wmz2yik67q-uc.a.run.app/"));

    socket.on("updateMessage", (msg: { msg: String; userId: Number }) => {
      setMessages((messages: any) => [...messages, msg]);
    });

    socket.on("newMember", (msg: { msg: String }) => {
      setMessages((messages: any) => [...messages, msg]);
    });

    socket.on("exitMember", (msg: { msg: String }) => {
      setMessages((messages: any) => [...messages, msg]);
    });

    // Clean up the socket connection when the component unmountss
    return () => socket.disconnect();
  }, [roomName]);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (input.trim() === "") return;
    const payload = {
      msg: input,
      sender: socket?.id,
      userId: socket?.id,
    };
    socket.emit("message", payload, (msg: { msg: String; userId: Number }) => {
      setMessages((messages: any) => [...messages, msg]);
    });
    setInput("");
  };

  const submitOnKeyPress = (e: any) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <List
        sx={{
          border: "1px solid black",
          height: "60vh",
          overflowY: "auto",
          px: 1,
          my: 1,
        }}
      >
        {messages.map((msg: any, index: any) =>
          msg.sender !== "server" ? (
            <ListItem key={index}>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {msg?.msg}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontSize: "10px",
                    }}
                  >
                    {msg?.userId !== socket?.id ? msg?.sender : "You"}
                  </Typography>
                }
                sx={{
                  textAlign:
                    msg?.userId === socket?.id
                      ? "end !important"
                      : "start !important",
                  px: { md: 5 },
                }}
              ></ListItemText>
            </ListItem>
          ) : (
            <ListItem key={index}>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      bgcolor: "#70707040",
                      display: "block",
                      borderRadius: "10px",
                      p: 1,
                    }}
                  >
                    {msg?.msg}
                  </Typography>
                }
                sx={{ textAlign: "center !important" }}
              ></ListItemText>
            </ListItem>
          )
        )}
        <Box ref={messagesEndRef} />
      </List>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          my: 2,
        }}
      >
        <TextField
          label="Message"
          sx={{
            flexGrow: 1,
          }}
          size="small"
          value={input}
          onKeyPress={submitOnKeyPress}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          disabled={!input}
          variant="contained"
          color="primary"
          onClick={onSubmit}
          sx={{
            py: 2,
            px: { md: 5 },
            height: "40px",
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ChatUI;
