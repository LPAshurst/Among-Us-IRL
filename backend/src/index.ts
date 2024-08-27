// import needed libraries
import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import * as cors from 'cors';
import { config } from 'dotenv';
import { Server } from "socket.io";
const http = require('http');

config();

// get express application
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000/"
  },
  connectionStateRecovery: {
    // the backup duration of the sessions and the packets
    maxDisconnectionDuration: 2 * 60 * 1000,
    // whether to skip middlewares upon successful recovery
    skipMiddlewares: false,
  }
});

// body parser middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set primary router
app.use('/api', routes);


// define socket.io methods
io.on('connection', (socket) => {
  if (socket.recovered) {
    console.log('a user recovered');
  } else {
    console.log('a user connected');
  }
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
  });
});

// define app port
const port = process.env.PORT || 3010;

// start the server
server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});