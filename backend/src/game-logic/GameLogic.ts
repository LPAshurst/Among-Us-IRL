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
  id: string;
  taskList: Task[];
  alive: boolean;
  role: string;

}

interface Game {
  code: string;
  players: Player[];
}

export const game: Game = {

  code:"",
  players:[]

}

export function populateGame(game_info, game: Game) {

  game.code = game_info["whatever"];
  


}
