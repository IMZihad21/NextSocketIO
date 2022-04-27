import * as React from "react";
import type { NextPage } from "next";
import { Box, Button, TextField, Typography } from "@mui/material";
import io from "socket.io-client";
let socket: any;

const Home: NextPage = () => {
  const [input, setInput] = React.useState("");

  React.useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", (msg: any) => {
      setInput(msg);
    });
  };

  const onChangeHandler = (e: any) => {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Chat App
      </Typography>
      <input
        placeholder="Type something"
        value={input}
        onChange={onChangeHandler}
      />
    </Box>
  );
};

export default Home;
