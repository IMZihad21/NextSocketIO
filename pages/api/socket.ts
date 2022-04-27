// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Server as IO } from "socket.io";
import { Server } from "http";

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
    const httpServer = res.socket.server as unknown as Server;
    const io = new IO(httpServer, {
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      console.log(`*Client connected: ${socket.id}`);
      const { roomName } = socket.handshake.query;
      if (roomName) {
        socket.join(roomName);
        console.log(`*Client joined room: ${roomName}`);

        socket.on("message", (msg) => {
          socket.to(roomName).emit("updateMessage", msg);
        });

        socket.on("disconnect", (reason) => {
          console.log(`*Client disconnected: ${reason}`);
          socket.to(roomName).emit("a user disconnected");
        });
      } else {
        socket.on("message", (msg) => {
          socket.broadcast.emit("updateMessage", msg);
        });

        socket.on("disconnect", (reason) => {
          console.log(`*Client disconnected: ${reason}`);
          socket.broadcast.emit("a user disconnected");
        });
      }
    });

    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
}
