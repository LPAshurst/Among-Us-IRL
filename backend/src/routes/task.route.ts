import { Router } from 'express';
import taskController from '../controller/task.controller';
import auth from '../config/auth';

const taskRouter = Router();
// specifies the endpoint and the method to call
taskRouter.get('/', taskController.getAll);

taskRouter.get('/', function (req, res) {
  res.send('id: ' + req.query.id);
});

taskRouter.get('/user/:id', (req, res) => {
  taskController.getUserTasks(req, res, +req.params.id);
});

taskRouter.get('/user', auth.authenticateToken, (req, res) => {
  taskController.getUserTasks(req, res, +(req as any).user);
});
// export the router
export default taskRouter;