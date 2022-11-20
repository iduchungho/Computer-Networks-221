import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import { LoginUserInput, RegisterUserInput } from "./user.schema";
import { loginService, registerService } from "./user.service";
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