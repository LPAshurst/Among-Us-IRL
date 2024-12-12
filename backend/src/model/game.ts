import Player from "./player";
import Task from "./task";

export default interface Game {
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