import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import { WebSocketServer } from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/*
 Server
*/

const server = express();

server.use(express.json());
server.use(express.static(path.join(__dirname, 'static')))

server.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})

server.listen(3000, () => console.log('App is listening on port 3000!'));


/*
  Sockets
*/

const socketServer = new WebSocketServer({ port: 8000 });

console.log("Web Socket server started.")

socketServer.on('connection', function connection(ws) {

  // Log each new user
  console.log("Connection with a client initiated.")

  ws.on('message', function incoming(message) {

    let data = JSON.parse(message);
    ws.send(JSON.stringify(data));

  });
});