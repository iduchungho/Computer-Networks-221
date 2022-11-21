import express from 'express';
import { processRequestBody, processRequestParams, processRequestQuery } from 'zod-express-middleware';
import { requireUser } from '../../middlewares/requireUser';
import catchAsync from '../../utils/catchAsync';
import { getUserController, loginController, logoutController, registerController, requestFriendController, searchFriendsController, getFriendsController, acceptFriendController, rejectFriendController, deleteFriendController } from './user.controller';
import { friendIdSchema, friendNameSchema, loginUserSchema, registerUserSchema } from './user.schema';

const userRouter = express.Router();
userRouter.post('/register',processRequestBody(registerUserSchema),catchAsync(registerController));
userRouter.post('/login',processRequestBody(loginUserSchema),catchAsync(loginController));
userRouter.get('/me',requireUser,catchAsync(getUserController))
userRouter.get('/logout',requireUser,catchAsync(logoutController));
userRouter.get('/searchFriends',requireUser,processRequestQuery(friendNameSchema),catchAsync(searchFriendsController));
userRouter.get('/getFriends',requireUser,catchAsync(getFriendsController));
userRouter.post('/requestFriend/:friendId',requireUser,processRequestParams(friendIdSchema),catchAsync(requestFriendController));
userRouter.post('/acceptFriend/:friendId',requireUser,processRequestParams(friendIdSchema),catchAsync(acceptFriendController));
userRouter.post('/rejectFriend/:friendId',requireUser,processRequestParams(friendIdSchema),catchAsync(rejectFriendController));
userRouter.delete('/deleteFriend/:friendId',requireUser,processRequestParams(friendIdSchema),catchAsync(deleteFriendController));
export default userRouter;