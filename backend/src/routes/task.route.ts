import { Router } from 'express';
import taskController from '../controller/task.controller';
import auth from '../config/auth';

const taskRouter = Router();

// TEMP GAME STUFF
interface Game {
  code: string;
  players: string[];
}
const gamelist = {"abc123": {code: "abc123", players: ["player1", "player2"]} as Game};


taskRouter.get('/game', (req, res) => {
  gamelist["new456"] = {code: "abc123", players: ["player1", "player2"]} as Game;
  res.json(gamelist);
})


// specifies the endpoint and the method to call
taskRouter.get('/', taskController.getAll);

// taskRouter.get('/', function (req, res) {
//   res.send('id: ' + req.query.id);
// });

taskRouter.get('/list', taskController.getExample);

taskRouter.get('/user/:id', (req, res) => {
  taskController.getUserTasks(req, res, +req.params.id);
});

taskRouter.get('/user', auth.authenticateToken, (req, res) => {
  taskController.getUserTasks(req, res, +(req as any).user);
});
// export the router
export default taskRouter;