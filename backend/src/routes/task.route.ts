import { Router } from 'express';
import taskController from '../controller/task.controller';
import auth from '../config/auth';

const taskRouter = Router();

// Gets all tasks
taskRouter.get('/', taskController.getAll);

// Gets an example tasklist
taskRouter.get('/list', taskController.getExample);

// Gets the tasklist specified by the given user id
taskRouter.get('/user/:id', (req, res) => {
  taskController.getUserTasks(req, res, +req.params.id);
});

// Gets all tasks associated with the given user
// Same as /user/id except it uses the authentication middleware to get the id
taskRouter.get('/user', auth.authenticateToken, (req, res) => {
  taskController.getUserTasks(req, res, +(req as any).user);
});


export default taskRouter;