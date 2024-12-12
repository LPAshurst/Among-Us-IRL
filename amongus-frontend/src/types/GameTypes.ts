export interface Task {

  id: string;
  title: string;
  location: string;
  description: string;
  status: boolean;
  difficulty: string;

}
export interface Player {
  
  username: string;
  id: string;
  taskList: Task[];
  alive: boolean;
  role: string;

}


export interface Settings {
  numImposters: number;
  numHard: number;
  numMedium: number;
  numEasy: number;
}

export interface Game {
  room: string;
  owner: number; //id of the owner user
  players: Record<number, Player>; //list of players 
  tasklist: Task[]; //list of tasks to be used by all players
  started: boolean;
  startTime: Date;
  imposterCount: number;
  totalTasks: number;
  completedTasks: number;
  meeting: boolean;
}


