import { getUserById } from '../user/user.service';
import prisma from "../../utils/prisma";

export const getRoomService = async (roomId : string) => {
    const room = await prisma.room.findFirst({
        where : {
            id : roomId,
        },
        select : {
            id : true,
            user1Id : true,
            user2Id : true,
            messages : {
                select : {
                    id : true,
                    content : true,
                    createdAt : true,
                    user : {
                        select : {
                            id : true,
                            username : true,
                        }
                    }
                },
                orderBy : {
                    createdAt : 'asc',
                }
            }
        }
    });
    if(room){
        return room;
    }
    return null;
}

export const addMessageService = async (roomId : string, userId : string, content : string) => {
    const message = await prisma.message.create({
        data : {
            content,
            userId,
            roomId,
        },
        select : {
            id : true,
            userId : true,
            content : true,
            createdAt : true,
        }
    });
    return {
        success : true,
        data : message,
    }
}