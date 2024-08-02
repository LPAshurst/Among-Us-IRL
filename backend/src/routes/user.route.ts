import { Router } from 'express';
import userController from '../controller/user.controller';
import auth from '../config/auth';

const userRouter = Router();
// specifies the endpoint and the method to call
userRouter.get('/', userController.getUsers);


// export the router
export default userRouter;