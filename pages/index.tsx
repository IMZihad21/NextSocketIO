import * as React from "react";
import type { NextPage } from "next";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import ChatUI from "@components/Custom/ChatUI";


const Home: NextPage = () => {
  const router = useRouter();
  const [roomName, setRoomName] = React.useState("");

  const handleNewRoom = (e: any) => {
    e.preventDefault();
    router.push(`/room/${roomName}`);
  };

  return (
    <React.Fragment>
      <ChatUI />
      <Box sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        gap: 2,
      }}>
        <TextField
          label="Room Name"
          sx={{
            flexGrow: 1,
            width: { xs: 1, md: "auto" }
          }}
          size="small"
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
        />
        <Button
          disabled={!roomName}
          variant="contained"
          color="primary"
          onClick={handleNewRoom}
          sx={{
            py: 2,
            px: { md: 5 },
            height: "40px",
            whiteSpace: "nowrap",
            width: { xs: 1, md: "auto" }
          }}
        >
          Create Custom Room
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default Home;
