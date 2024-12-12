import { Router } from 'express';
import taskRouter from './task.route';
import userRouter from './user.route';
import gameRouter from './game.route';

const routes = Router();

// Defines the base paths and the routers that are used
routes.use('/tasks', taskRouter);
routes.use('/auth', userRouter);
routes.use('/game', gameRouter);

export default routes;