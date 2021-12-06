import http from "http";
import SocketIO from "socket.io";
// import WebSocket from "ws";
import express from "express";
// import { parse } from "path";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handelListen = () => console.log("Listening on http://localhost:3000");

const httpServer = http.createServer(app);
// const wss = new WebSocket.Server({ server });
const wss = SocketIO(server);
// http서버, wss를 전부 원하는 경우

wss.on("connection", (socket) => {
  console.log(socket);
});

/* Wss without Socket.io
const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anon";
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("Disconnected from Browser ❌"));
  socket.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
      case "nickname":
        socket["nickname"] = message.payload;
    }
  });
});

httpServer.listen(3000, handelListen);
*/
