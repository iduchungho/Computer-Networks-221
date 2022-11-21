import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import { FriendIdInput, FriendNameInput, LoginUserInput, RegisterUserInput } from "./user.schema";
import { acceptFriendService, deleteFriendService, getFriendsService, loginService, registerService, rejectFriendService, requestFriendService, searchFriendsService } from "./user.service";
import { signJwt } from '../../utils/jwt.utils';

export const registerController = async (req: Request<{},{},RegisterUserInput>, res: Response) => {
    const user = await registerService(req.body);
    if(!user) {
        return res.status(StatusCodes.BAD_REQUEST).send("User already exists");
    }
    res.status(StatusCodes.CREATED).send(user);
}
export const loginController = async (req: Request<{},{},LoginUserInput>, res: Response) => {
    const user = await loginService(req.body);
    if(!user) {
        res.status(StatusCodes.UNAUTHORIZED).send("Invalid email or password");
    }
    const accessToken = signJwt(
        {...user},
        {expiresIn : process.env.ACCESS_TOKEN_TTL || '15m'}
    );
    const refreshToken = signJwt(
        {...user},
        {expiresIn : process.env.REFRESH_TOKEN_TTL || '7d'}
    );
    return res.status(StatusCodes.OK).send({
        accessToken,
        refreshToken,
    });
}
export const getUserController = async (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).send(res.locals.user);
}
export const logoutController = async (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).send({
        accessToken : null,
        refreshToken : null,
    });
}
export const searchFriendsController = async (req: Request<{},{},{},FriendNameInput>, res: Response) => {
    const {friendName} = req.query;
    const friends = await searchFriendsService(friendName);
    // exclude the current user from the list of friends
    const filteredFriends = friends.filter(friend => friend.id !== res.locals.user.id);
    return res.status(StatusCodes.OK).send(filteredFriends);
};
export const getFriendsController = async (req: Request, res: Response) => {
    const friends = await getFriendsService(res.locals.user.id);
    return res.status(StatusCodes.OK).send(friends);
};
export const requestFriendController = async (req: Request<FriendIdInput,{},{}>, res: Response) => {
    const {friendId} = req.params;
    const {id} = res.locals.user;
    const request = await requestFriendService(id, friendId);
    return res.status(StatusCodes.OK).send(request);
};
export const acceptFriendController = async (req: Request<FriendIdInput,{},{}>, res: Response) => {
    const {friendId} = req.params;
    const {id} = res.locals.user;
    const request = await acceptFriendService(id, friendId);
    return res.status(StatusCodes.OK).send(request);
};
export const rejectFriendController = async (req: Request<FriendIdInput,{},{}>, res: Response) => {
    const {friendId} = req.params;
    const {id} = res.locals.user;
    const request = await rejectFriendService(id, friendId);
    return res.status(StatusCodes.OK).send(request);
};
export const deleteFriendController = async (req: Request<FriendIdInput,{},{}>, res: Response) => {
    const {friendId} = req.params;
    const {id} = res.locals.user;
    const request = await deleteFriendService(id, friendId);
    return res.status(StatusCodes.OK).send(request);
}