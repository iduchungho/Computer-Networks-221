import prisma from "../../utils/prisma";
import { LoginUserInput, RegisterUserInput } from "./user.schema";
import * as argon2 from 'argon2';
export const registerService = async (input : RegisterUserInput) => {
    const { email, password, username } = input;
    // Check if user already exists
    const foundUser = await prisma.user.findUnique({
        where : {
            email,
        }
    });
    if(foundUser) {
        return null;
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
        },
        select : {
            id : true,
            username : true,
            email : true,
        }
    });
    return newUser;
};

export const loginService = async (input : LoginUserInput) => {
    const { email, password } = input;
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        select : {
            id : true,
            username : true,
            email : true,
            password : true,
        }
    });
    if(user && await argon2.verify(user.password, password)){
        const { password, ...rest } = user;
        return rest;
    }
    return null;
}
