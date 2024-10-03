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
  players:{
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mjc5MTY2OTMsImV4cCI6MTcyNzkxODQ5M30.7xEj57t8M2Q8xEi5gGrXhQ9IleucBkNwjtxd0UQXeWw": 
    {
      alive:true,
      username:"Lorenzo",
      taskList: taskList,
      role:"imposter"
    },
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjcyODEyNjEsImV4cCI6MTcyNzI4MzA2MX0.EOlfw6RDZWBtb4d0E2UPQzgJuavBt3IQxcn0pS-FSaU":
    {
      alive: true,
      username: "Zane",
      taskList: taskList,
      role:"crewmate"

    }

  }

}

export function populateGame(game_info, game: Game) {

  game.code = game_info["whatever"];
  
}
