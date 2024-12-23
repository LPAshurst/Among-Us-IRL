// import needed libraries
import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import * as cors from 'cors';
import { config } from 'dotenv';
import { Server } from "socket.io";
import { createServer } from 'http';
import { gamelist, overwriteGamelist, determineTasks, checkGameOver, ensureGameExists} from './controller/game.controller';
import auth from './config/auth';
import { Settings } from './model/settings';

config();


// Get express application
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
  },
  connectionStateRecovery: {
    // the backup duration of the sessions and the packets
    maxDisconnectionDuration: 2 * 60 * 1000,
    // whether to skip middlewares upon successful recovery
    skipMiddlewares: true,
  }
});

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set primary router
app.use('/api', routes);

//Authentication middleware for sockets
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    auth.unwrapToken(token);
  } catch (err) {
    next(new Error("Invalid authentication token"));
  }
  next();
});


// Define socket.io methods
io.on('connection', (socket) => {
  if (socket.recovered) {
    console.log('User recovered');
  } else {
    console.log(`User connected: ${socket.id}`);
  }

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('join', async (room, callback) => {
    try {
      socket.join(room);
      let pid = auth.unwrapToken(socket.handshake.auth.token);
      const game = gamelist[room];
      if (!game.started && !(pid in game.players) && +pid != game.owner) { //check if game has already started, fail if so, TODO then error. Check if already in game
        const name = await auth.getUsername(pid);
        game.players[pid] = { username: name, tasklist: [], alive: false, imposter: false };
        console.log(`User ${pid} has been added to game ${room}`);
      }
      
      const clients = Object.values(game.players).map((val) => val.username); //return playerlist from game object
      io.to(room).emit("clientList", clients);
    } catch (err) {

    }
  });

  socket.on("startGame", (room, taskList, settings: Settings, callback) => {
    
    if (ensureGameExists(room)) {
      const game = gamelist[room];
      if (game.started || settings.numImposters > Object.keys(game.players).length) {
        callback(false, "Invalid number of imposters for player count");
        return;
      }
      if (settings.numEasy > game.tasklist.filter(t => t.difficulty == "Easy").length) {
        callback(false, "Invalid number of easy tasks for tasklist");
        return;
      }
      if (settings.numMedium > game.tasklist.filter(t => t.difficulty == "Medium").length) {
        callback(false, "Invalid number of medium tasks for tasklist");
        return;
      }
      if (settings.numHard > game.tasklist.filter(t => t.difficulty == "Hard").length) {
        callback(false, "Invalid number of hard tasks for tasklist");
        return;
      }
      game.started = true;
      io.to(room).emit("gameStarted");
      gamelist[room] = determineTasks(game, taskList, settings);
      callback(true);
    } else {
      callback(false, "The game doesnt exist anymore")
    }
  }); 

  socket.on("initMeeting", (room, message, type) => {

    const game = gamelist[room];
    if (game) {
      game.meeting = true;
      io.to(game.room).emit("meetingMessage", message, type); 
    }
 

 
  });

  socket.on("endMeeting", (room) => {
    const game = gamelist[room];
    if (game) {
      game.meeting = false;
      io.to(game.room).emit("completedMeeting");  
    }

  });

  socket.on("votedOut", (room, username) => {

    const game = gamelist[room];
    if (game) {
      const playerKeyList = Object.keys(game.players).filter((key) => game.players[key].username == username);

      if (playerKeyList.length == 0) {
        console.log("player doesnt exist");
      } else { 
        let key = playerKeyList[0]
        game.players[key].alive = false;
        socket.emit("votingResults", username, game.players[key].imposter);
      }
  
      let done, message;
      [done, message] = checkGameOver(game);
  
      if (done) {
        io.to(room).emit("gameOver", message);
        delete gamelist[room];
      }
    }

  });

  socket.on("markSelfDead", (room) => {
    const game = gamelist[room];
    if (game) {
      let pid = auth.unwrapToken(socket.handshake.auth.token);
      game.players[pid].alive = false;

      let done, message;
      [done, message] = checkGameOver(game);
      if (done) {
        io.to(room).emit("gameOver", message);
        delete gamelist[room];
      }
    }
  });
  
  socket.on("requestAlive", (room) => { 

    const game = gamelist[room];
    if (game) {
      const alive = Object.values(game.players).filter((val) => val.alive).map((val) => val.username);
      io.to(room).emit("aliveList", alive);
    }

  });

  socket.on("leave", (room) => {

    socket.leave(room);
    let pid = auth.unwrapToken(socket.handshake.auth.token);
    const game = gamelist[room];
    if (game) {
      delete game.players[pid];
      const clients = Object.values(game.players).map((val) => val.username); //return playerlist from game object
      io.to(room).emit("clientList", clients);
    }
  });

  socket.on("requestTasks", (room) => {
    let pid = auth.unwrapToken(socket.handshake.auth.token);
    const game = gamelist[room];

    if (game && game.players.hasOwnProperty(pid)) {
      io.to(game.room).emit("totalTasks", game.completedTasks, game.totalTasks);
      socket.emit("receiveTasks", game.players[pid].tasklist);
    } else {
      console.log("No matching player found in game")
    }
  });

  socket.on("requestMeetingStatus", (room) => {
    const game = gamelist[room];
    if (game) {
      io.to(room).emit("recieveMeetingStatus", game.meeting);
    }
  });


  socket.on("requestRole", (room) => {
    let pid = auth.unwrapToken(socket.handshake.auth.token);
    const game = gamelist[room];
    if (game && game.players[pid].imposter) {
      const imposterList = Object.keys(game.players).filter((key) => (key != pid && game.players[key].imposter)).map((pid) => game.players[pid].username);
      socket.emit("recieveRole", "Imposter", imposterList);
    }
  });

  socket.on("finishedTask", (room, taskTitle: string) => {
    let pid = auth.unwrapToken(socket.handshake.auth.token);
    const game = gamelist[room];
    if (game && game.players.hasOwnProperty(pid)) {
      //FIXME this gets messed up when multiple people have the same tasks
      const tasklist = game.players[pid].tasklist
      for (const task of tasklist) {
        if (task.title == taskTitle && !task.status) {
          task.status = true;
          // Only complete the task if its a crewmate
          if (!game.players[pid].imposter) {
            game.completedTasks += 1;
          }
        }
      }
      io.to(game.room).emit("totalTasks", game.completedTasks, game.totalTasks);
    } else {
      console.log("user doesnt exist");
    }

    let done, message;
    [done, message] = checkGameOver(game);

    if (done) {
      io.to(room).emit("gameOver", message);
      delete gamelist[room];
    }
    
  });
  
});

// Define app port
const port = process.env.PORT || 3010;

// start the server
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function cleanGames() {
  let newGamelist = {};
  newGamelist['room'] = gamelist["room"];
  for (const code of Object.keys(gamelist)) {
    if (gamelist[code].room != "room" && ((new Date()).getTime() - gamelist[code].startTime.getTime()) / 1000 < 7200) {
      // Add this game to new list
      newGamelist[code] = gamelist[code];
    }
  }
  overwriteGamelist(newGamelist);
  setTimeout(cleanGames, 7200 * 1000);  
}

setTimeout(cleanGames, 7200 * 1000);
