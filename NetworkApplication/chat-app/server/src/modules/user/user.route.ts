import express from 'express';
import { processRequestBody } from 'zod-express-middleware';
import { requireUser } from '../../middlewares/requireUser';
import catchAsync from '../../utils/catchAsync';
import { getUserController, loginController, logoutController, registerController } from './user.controller';
import { loginUserSchema, registerUserSchema } from './user.schema';

const userRouter = express.Router();
userRouter.post('/register',processRequestBody(registerUserSchema),catchAsync(registerController));
userRouter.post('/login',processRequestBody(loginUserSchema),catchAsync(loginController));
userRouter.get('/me',requireUser,catchAsync(getUserController))
userRouter.get('/logout',requireUser,catchAsync(logoutController));
export default userRouter;