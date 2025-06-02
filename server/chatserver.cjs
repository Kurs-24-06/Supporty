const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log('Ein Benutzer hat sich verbunden');

  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('Ein Benutzer hat sich getrennt');
  });
});

/*
server.listen(3006, () => {
  console.log('Chat-Server läuft auf Port 3006');
});
*/
// AWS
server.listen(3006, '0.0.0.0', () => {
  console.log('Chat-Server läuft auf Port 3006');
});

