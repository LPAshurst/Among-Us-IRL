import { Router } from 'express';
import gameController from '../controller/game.controller';

const gameRouter = Router();
// specifies the endpoint and the method to call
gameRouter.post('/', gameController.createGame);

// export the router
export default gameRouter;