import { Router } from 'express';
import taskController from '../controller/task.controller';
const taskRouter = Router();
// specifies the endpoint and the method to call
taskRouter.get('/', taskController.getAll);
// export the router
export default taskRouter;