import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{
        justifyContent: "center",
      }}>
        <Typography
          variant="h6"
          component="div"
        >
          Simple Chat App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
