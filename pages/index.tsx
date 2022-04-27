import * as React from "react";
import type { NextPage } from "next";
import { Box, Button, List, ListItem, ListItemText, TextField } from "@mui/material";
import io from "socket.io-client";
import { useRouter } from "next/router";
let socket: any;

const Home: NextPage = () => {
  const router = useRouter();
  const [input, setInput] = React.useState("");
  const [roomName, setRoomName] = React.useState("");
  const [messages, setMessages] = React.useState<any>([]);

  React.useEffect(() => {
    socket = io({ path: "/api/socket" })

    socket.on("updateMessage", (msg: { msg: String, userId: Number }) => {
      setMessages((messages: any) => [...messages, msg]);
    });

    // Clean up the socket connection when the component unmountss
    return () => socket.disconnect();
  }, []);

  const onSubmit = (e: any) => {
    e.preventDefault();
    setMessages((messages: any) => [...messages, { msg: input, userId: socket?.id }]);
    socket.emit("message", {
      msg: input,
      userId: socket?.id,
    });
  };

  const handleNewRoom = (e: any) => {
    e.preventDefault();
    router.push(`/room/${roomName}`);
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
                secondary={msg.userId === socket?.id ? "You" : "Other"}
                sx={{
                  textAlign: msg.userId === socket?.id ? "end !important" : "start !important",
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
        my: 2
      }}>
        <TextField
          label="Message"
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
      <Box sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        py: 1
      }}>
        <TextField
          label="Room Name"
          sx={{
            flexGrow: 1
          }}
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleNewRoom}
          sx={{
            py: 2,
            px: 5
          }}
        >
          Create Custom Room
        </Button>
      </Box>
    </Box >
  );
};

export default Home;
