const express = require('express');
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var path = require('path');

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + "/public/canvas.html"));
});

app.get('/controller', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/controller.html'));
});

server.listen(3000);

let controllers = {};

setInterval(()=>io.emit("update", Object.values(controllers)), 30);

io.on("connection", (client) => {
  client.on("controller", () => {
    client.on("update", (dist) => {
      controllers[client.id] = dist; 
    });

    client.on("disconnect", () => {
      delete controllers[client.id];
    });
  });
});