import * as React from "react";
import type { NextPage } from "next";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useRouter } from "next/router";
import ChatUI from "@components/Custom/ChatUI";


const Home: NextPage = () => {
  const router = useRouter();
  const [roomName, setRoomName] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleNewRoom = (e: any) => {
    e.preventDefault();
    router.push(`/room/${roomName}`);
  };

  return (
    <React.Fragment>
      <ChatUI />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          py: 2,
          px: { md: 5 },
          height: "40px",
          whiteSpace: "nowrap",
          width: 1,
        }}
      >
        Create Custom Room
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle sx={{
          fontSize: { xs: "15px", md: "22px" },
        }}>
          Join in a private room
        </DialogTitle>
        <DialogContent
          sx={{
            width: { xs: 1, md: "400px" },
            p: 2
          }}>
          <TextField
            label="Room Name"
            sx={{
              width: 1,
              my: 1,
            }}
            size="small"
            value={roomName}
            onChange={e => setRoomName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={!roomName}
            color="primary"
            onClick={handleNewRoom}
          >
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Home;
