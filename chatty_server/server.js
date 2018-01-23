// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');


// Set the port to 3001
const PORT = 3001;
const clients = [];

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


wss.broadcast = function broadcast(data){
  wss.clients.forEach(function each(client){
    if (client.readyState === WebSocket.OPEN){
      client.send(JSON.stringify(data));
    }
  });
};

wss.userCount = function userCount() {
  const uId = uuidv4()
  const usersHere = {
    id: uId,
    content: String(wss.clients.size),
    type: 'userCount'
  };
  wss.broadcast(usersHere);
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the socket parameter in the callback.
wss.on('connection', (socket) => {
  console.log('Client connected');
  clients.push(socket);

  wss.userCount();

  socket.on('message', function incoming(message){
    let msg = JSON.parse(message);
    const uId       = uuidv4(),
          username  = msg.username;

    console.log(msg);

    const userMsg = {
      id: uId,
      username: username,
      content: msg.content
    }

    wss.broadcast(userMsg);

  });
  // let userCount = wss.countUser(wss.clients.size);
  // wss.broadcast(JSON.stringify(userCount));

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  socket.on('close', () => {
    console.log('Client disconnected')
    wss.userCount();
  });
  socket.on('error', () => {console.log('Error')});
});

