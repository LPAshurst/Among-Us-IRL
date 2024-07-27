import { Router } from 'express';
import taskRouter from './task.route';
const routes = Router();
// define the base path and the router that's going to be called
routes.use('/tasks', taskRouter);
// export the route
export default routes;