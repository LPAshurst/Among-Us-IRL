interface Tasks {

  title: string;
  location: string;
  description: string;

}
interface Player {
  
  username: string;
  id: string;
  taskList: Tasks[];
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
