import { Router } from 'express';
import taskController from '../controller/task.controller';
import auth from '../config/auth';

const userRouter = Router();
// specifies the endpoint and the method to call
userRouter.get('/', taskController.getUsers);


// export the router
export default userRouter;