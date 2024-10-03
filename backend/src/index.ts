// import needed libraries
import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import * as cors from 'cors';
import { config } from 'dotenv';
import { Server } from "socket.io";
import { createServer } from 'http';
import { game, populateGame, Task } from './game-logic/GameLogic';

config();

// get express application
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials:true,
    optionsSuccessStatus:200
  },
  connectionStateRecovery: {
    // the backup duration of the sessions and the packets
    maxDisconnectionDuration: 2 * 60 * 1000,
    // whether to skip middlewares upon successful recovery
    skipMiddlewares: true,
  }
});

console.log(game);

populateGame({"whatever": "stuff"}, game);

console.log(game)
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
  socket.on("reconnect", () => console.log("RECONNECTED"));
  if (socket.recovered) {
    console.log('a user recovered');
  } else {
    console.log(`a user connected: ${socket.id}`);
  }

  socket.on('game-information', (obj) =>{

    populateGame(obj, game);

  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', 'whaddup gang')
  });

  socket.on('join', (room) => {
    console.log(`user has been added to room ${room}`);
    game.players.push({username: "Testing", id: "", taskList: [], alive: false, role: ""})
  });

  socket.on("requestTasks", () => {

    console.log("im here")
    const taskList: Task[] = [
      {
        id: "1",
        title: "Complete the project",
        location: "Office",
        description: "Finish the project by the end of the week.",
        status: false,
        difficulty: "Hard"
      },
      {
        id: "2",
        title: "Submit the report",
        location: "Home",
        description: "Submit the weekly report by Friday evening.",
        status: false,
        difficulty: "Medium"
      },
      {
        id: "3",
        title: "Attend team meeting",
        location: "Conference Room",
        description: "Discuss the next sprint and assign tasks.",
        status: false,
        difficulty: "Easy"
      },
      {
        id: "4",
        title: "Code review",
        location: "Office",
        description: "Review the latest code changes submitted by the team.",
        status: false,
        difficulty: "Medium"
      },
      {
        id: "5",
        title: "Prepare presentation",
        location: "Home",
        description: "Prepare slides for the upcoming project presentation.",
        status: false,
        difficulty: "Hard"
      },
      {
        id: "6",
        title: "Fix bugs",
        location: "Office",
        description: "Resolve high-priority bugs reported during testing.",
        status: false,
        difficulty: "Hard"
      },
      {
        id: "7",
        title: "Plan team-building event",
        location: "Cafe",
        description: "Organize a team-building event for next month.",
        status: false,
        difficulty: "Easy"
      }
    ];
    socket.emit('receiveTasks', taskList);

  });

  socket.on('room message', (msg, room) => {
    console.log(`message to room ${room}: ${msg}`);
    io.to(room).emit('chat message', msg);
  });
});



// define app port
const port = process.env.PORT || 3010;
// start the server



server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});