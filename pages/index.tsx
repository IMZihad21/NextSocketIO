import * as React from "react";
import type { NextPage } from "next";
import { Box, Button, List, ListItem, ListItemText, TextField } from "@mui/material";
import io from "socket.io-client";
let socket: any;
let userId: string = `${Math.random()}`;

const Home: NextPage = () => {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<any>([]);

  React.useEffect(() => {
    socket = io({ path: "/api/socket" })
    socket.on('connect', () => {
      console.log('connect')
      socket.emit('hello')
    })
    socket.on("updateMessage", (msg: { msg: String, userId: Number }) => {
      setMessages((messages: any) => [...messages, msg]);
    });

    // Clean up the socket connection when the component unmountss
    return () => socket.disconnect();
  }, []);

  const onSubmit = (e: any) => {
    e.preventDefault();
    setMessages((messages: any) => [...messages, { msg: input, userId }]);
    socket.emit("message", {
      msg: input,
      userId: userId,
    });
  };

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
    }}>
      <List sx={{
        border: "1px solid black",
        height: "60vh",
        overflowY: "auto",
        p: 1,
      }}>

        {
          messages.map((msg: any, index: any) => (
            <ListItem
              key={index}>
              <ListItemText
                primary={msg.msg}
                secondary={msg.userId === userId ? "You" : "Other"}
                sx={{
                  textAlign: msg.userId === userId ? "end !important" : "start !important",
                  px: 5
                }}
              />
            </ListItem>
          ))
        }
      </List>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}>
        <TextField
          sx={{
            flexGrow: 1
          }}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          sx={{
            py: 2,
            px: 5
          }}
        >
          Submit
        </Button>
      </Box>
    </Box >
  );
};

export default Home;
