const express = require('express');
const http = require('http');


const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

// Define a socket.io connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle chat message event
  socket.on('chat message', (message) => {
    console.log('Received message:', message);

    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});




server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
