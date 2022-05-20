// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Server as IO } from "socket.io";
import { Server } from "http";
import { isProd } from "@configs/vairables";

interface ExtendedNextApiResponse extends NextApiResponse {
  socket: any;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: ExtendedNextApiResponse
) {
  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io");
    const httpServer = res.socket.server as Server;
    const io = new IO(httpServer, {
      path: isProd ? "/socketio/api/socket" : "/api/socket",
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log(`*Client connected: ${socket.id}`);
      const { roomName } = socket.handshake.query;
      if (roomName) {
        socket.join(roomName);
        socket
          .to(roomName)
          .emit("newMember", { msg: `${socket.id} joined the chat!`, sender: "server" });
        console.log(`*Client joined room: ${roomName}`);

        socket.on("message", (msg, callback) => {
          socket.to(roomName).emit("updateMessage", msg);
          callback(msg);
        });

        socket.on("disconnect", (reason) => {
          console.log(`*Client disconnected: ${reason}`);
          socket
            .to(roomName)
            .emit("exitMember", { msg: `${socket.id} left the chat!`, sender: "server" });
        });
      } else {
        socket.broadcast.emit("newMember", {
          msg: `${socket.id} joined the chat!`,
          sender: "server"
        });

        socket.on("message", (msg, callback) => {
          socket.broadcast.emit("updateMessage", msg);
          callback(msg);
        });

        socket.on("disconnect", (reason) => {
          console.log(`*Client disconnected: ${reason}`);
          socket.broadcast.emit("exitMember", {
            msg: `${socket.id} left the chat!`, 
            sender: "server"
          });
        });
      }
    });
    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
}
