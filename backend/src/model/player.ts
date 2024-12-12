import Task from "./task";

export default interface Player {
    username: string;
    tasklist: Task[];
    alive: boolean;
    imposter: boolean;
  }