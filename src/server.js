import http from "http";
import SocketIO from "socket.io";
// import WebSocket from "ws";
import express from "express";
// import { parse } from "path";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
// const wss = new WebSocket.Server({ server });
const wss = SocketIO(httpServer);
// http서버, wss를 전부 원하는 경우

wss.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });
  socket.on("enter_room", (roomName, done) => {
    console.log(socket.rooms);
    socket.join(roomName);
    done();
  });
});
// 3. SocketIO는 직접 event를 만들 수 있음

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
