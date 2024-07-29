import { Router } from 'express';
import taskController from '../controller/task.controller';
const taskRouter = Router();
// specifies the endpoint and the method to call
taskRouter.get('/', taskController.getAll);

taskRouter.get('/', function(req, res){
    res.send('id: ' + req.query.id);
  });
taskRouter.get('/:id', (req, res) => {
    taskController.getUserTasks(req, res, +req.params.id);
}
);
// export the router
export default taskRouter;