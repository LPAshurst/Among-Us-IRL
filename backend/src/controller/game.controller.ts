import Task from '../model/task';
import Game from '../model/game';
import Player from '../model/player';
import { Settings } from '../model/settings';

// Template tasklist
const temptaskList: Task[] = [
  {
    id: "1",
    title: "Snake game",
    location: "Lorenzo's room",
    description: "Go to Lorenzo's computer and reach 15 on snake which should already be on the computer.",
    status: false,
    difficulty: "Hard"
  },
  {
    id: "2",
    title: "Luna's toys",
    location: "Living Room",
    description: "Put luna's toys in the toy bin.",
    status: false,
    difficulty: "Medium"
  },
  {
    id: "3",
    title: "Cards",
    location: "Eating Room beside the kitchen",
    description: "Place the playing cards back in their container",
    status: false,
    difficulty: "Easy"
  },
  {
    id: "4",
    title: "Microwave",
    location: "Kitchen",
    description: "Close the microwave and start it for 5 seconds",
    status: false,
    difficulty: "Easy"
  },
  {
    id: "5",
    title: "Catan sorting",
    location: "Dining room",
    description: "Sort the cities into their respective colors.",
    status: false,
    difficulty: "Medium"
  },
  {
    id: "6",
    title: "Wash Hands",
    location: "Downstairs bathroom",
    description: "Wash hands for 10 seconds",
    status: false,
    difficulty: "Medium"
  },
  {
    id: "7",
    title: "Darts",
    location: "Basement",
    description: "Land three darts on the board in a row",
    status: false,
    difficulty: "Easy"
  },
  {
    id: "8",
    title: "Foosball",
    location: "Basement",
    description: "Play foosball with another person until someone reaches 3 points",
    status: false,
    difficulty: "Hard"
  },
  {
    id: "9",
    title: "Red Plates",
    location: "Basement",
    description: "Relocate the red plates from the stoarge room to the bedroom",
    status: false,
    difficulty: "Easy"
  },
  {
    id: "10",
    title: "Nails",
    location: "Garage",
    description: "Nail 5 nails into a piece of wood in the garage",
    status: false,
    difficulty: "Hard"
  },
  {
    id: "11",
    title: "Blanket",
    location: "Living Room",
    description: "Fold the blanket in the living room",
    status: false,
    difficulty: "Medium"
  },
  {
    id: "12",
    title: "Curling weights",
    location: "Office",
    description: "Curl the 5 pound weight in the office 5 times",
    status: false,
    difficulty: "Easy"
  },
  {
    id: "13",
    title: "Pushups",
    location: "Family Room",
    description: "Do 15 pushups",
    status: false,
    difficulty: "Hard"
  },
  {
    id: "14",
    title: "Drawing a picture",
    location: "Lorenzo's Room",
    description: "Draw a picture of a happy family with a house and sign your name",
    status: false,
    difficulty: "Hard"
  },
];

// Template game
const tempgame: Game = {
  room: "room",
  started: false,
  players: {
    2: {
      alive: true,
      username: "Lorenzo",
      tasklist: JSON.parse(JSON.stringify(temptaskList)), //Done to make a deep copy
      imposter: true
    },
    1: {
      alive: true,
      username: "Zane",
      tasklist: JSON.parse(JSON.stringify(temptaskList)),
      imposter: false
    }
  },
  totalTasks: temptaskList.length * 2,
  completedTasks: 0,
  tasklist: temptaskList,
  owner: 2,
  startTime: null,
  imposterCount: 1,
  meeting: false
}

// Master list of all active games
let gamelist: Record<string, Game> = { 'room': tempgame };

// Add a given game object to a certain room
function populateGame(roomcode, game: Game) {
  gamelist[roomcode] = game;
}

// Generate random room code, implementation should be fine for sparse gamelists
function generateCode() {
  let code = (Math.random() + 1).toString(36).substring(2, 6);
  while (code in gamelist) {
    code = (Math.random() + 1).toString(36).substring(2, 6);
  }
  return code;
}

// Create a fresh game object with template tasks
function createTemplateGame(id) {
  let game: Game = {
    room: generateCode(),
    started: false,
    players: {},
    totalTasks: 0, // This will be set when we get the settings
    completedTasks: 0,
    owner: id,
    startTime: new Date(),
    imposterCount: 1,
    meeting: false,
    tasklist: temptaskList
  }
  gamelist[game.room] = game;
  return game;
}

// Remove sensitive data from the game object for requests
function packageGame(game) {
  return { ...game, players: Object.values(game.players), owner: undefined }
}

function overwriteGamelist(newGamelist) {
  gamelist = newGamelist;
}

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function checkGameOver(game: Game) {
  
  const numAliveCrewmates = Object.values(game.players).filter((val) => val.alive && !val.imposter).length;

  const numAliveImposters = Object.values(game.players).filter((val) => val.alive && val.imposter).length;

  if (numAliveCrewmates <= numAliveImposters) {
    return [true, "imposters win!!!"];
  }

  if (game.completedTasks == game.totalTasks || numAliveImposters == 0) {
    return [true, "crewmates win!!!!"]
  }

  return [false, ""]

}

function determineTasks(game: Game, taskList: Task[], settings: Settings) {

  let newGame = game;
  let numHard = settings.numHard;
  let numMedium = settings.numMedium;
  let numEasy = settings.numEasy;
  newGame.totalTasks = (numHard + numMedium + numEasy) * (Object.keys(newGame.players).length - settings.numImposters);
  let numImposter = settings.numImposters;

  let hards = taskList.filter((task) => task.difficulty == "Hard");
  shuffle(hards);

  let mediums = taskList.filter((task) => task.difficulty == "Medium");
  shuffle(mediums);

  let easys = taskList.filter((task) => task.difficulty == "Easy");
  shuffle(easys);

  console.log(easys);
  console.log(mediums);
  console.log(hards);

  let hardIndex = 0;
  let mediumIndex = 0;
  let easyIndex = 0;
  for (const playerID of Object.keys(newGame.players)) {
    let player: Player = newGame.players[playerID];
    let playerTasks: Task[] = [];
    player.imposter = false;
    player.alive = true;

    for (let i = 0; i < numHard; i++) {
      let newTask: Task = JSON.parse(JSON.stringify(hards[hardIndex])); // need to make deep copy
      playerTasks.push(newTask);
      hardIndex = (hardIndex + 1) % hards.length
    }

    for (let i = 0; i < numMedium; i++) {
      let newTask: Task = JSON.parse(JSON.stringify(mediums[mediumIndex])); // need to make deep copy
      playerTasks.push(newTask);
      mediumIndex = (mediumIndex + 1) % mediums.length
    }

    for (let i = 0; i < numEasy; i++) {
      let newTask: Task = JSON.parse(JSON.stringify(easys[easyIndex])); // need to make deep copy
      playerTasks.push(newTask);
      easyIndex = (easyIndex + 1) % easys.length
    }
    player.tasklist = playerTasks;
  }

  let playerIds = Object.keys(newGame.players);
  shuffle(playerIds);
  
  for (let k = 0; k < numImposter; k++) {
    const player: Player = newGame.players[playerIds[k]]
    player.imposter = true;
  }

  return newGame;

}

function ensureGameExists(roomcode: string) {

  return Object.keys(gamelist).includes(roomcode);
}

export { gamelist, populateGame, generateCode, createTemplateGame, packageGame, overwriteGamelist, determineTasks, checkGameOver, ensureGameExists }