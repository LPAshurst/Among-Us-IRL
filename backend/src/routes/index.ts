import { Router } from 'express';
import taskRouter from './task.route';
import userRouter from './user.route';
import gameRouter from './game.route';

const routes = Router();
// define the base path and the router that's going to be called
routes.use('/tasks', taskRouter);
routes.use('/auth', userRouter);
routes.use('game', gameRouter);
// export the route
export default routes;