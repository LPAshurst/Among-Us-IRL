// import needed libraries
import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import * as cors from 'cors';
import { config } from 'dotenv';
import { Server } from "socket.io";
import { createServer } from 'http';

config();

// get express application
const app = express();
const server = createServer(app);
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

// Cors is not needed here because its added in the io server
// body parser middleware
const corsOptions = {
  origin:'http://localhost:3000', 
  credentials:true, //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
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
    io.emit('chat message', 'whaddup gang')
  });
});



// define app port
const port = process.env.PORT || 3010;
// start the server
server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});