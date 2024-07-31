import { Router } from 'express';
import taskController from '../controller/task.controller';
import auth from '../config/auth';

const userRouter = Router();
// specifies the endpoint and the method to call
userRouter.get('/', taskController.getUsers);

userRouter.get('/login', auth.getUserToken);

//change to post later
userRouter.get('/create', auth.createNewUser);

// export the router
export default userRouter;