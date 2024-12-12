import { Router } from 'express';
import userController from '../controller/user.controller';
import auth from '../config/auth';

const userRouter = Router();

// Get a list of all users TODO remove this
userRouter.get('/', userController.getUsers);

// Login the user and send the jwt token
userRouter.post('/login', auth.getUserToken);

// Create a new user in the database
userRouter.post('/create', auth.createNewUser);


export default userRouter;