export interface Task {

  id: string;
  title: string;
  location: string;
  description: string;
  status: boolean;
  difficulty: string;

}


interface Player {
  
  username: string;
  taskList: Task[];
  alive: boolean;
  role: string;

}

interface Game {
  code: string;
  started: boolean;
  players: Record<string, Player>;
}

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


export const game: Game = {

  code:"room",
  started:false,
  players:{
    2: 
    {
      alive:true,
      username:"Lorenzo",
      taskList: JSON.parse(JSON.stringify(taskList)),
      role:"imposter"
    },
    1:
    {
      alive: true,
      username: "Zane", 
      taskList: JSON.parse(JSON.stringify(taskList)),
      role:"crewmate"

    }

  }

}

export function populateGame(game_info, game: Game) {

  game.code = game_info["code"];
  
}
