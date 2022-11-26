import { NextFunction, Request, Response } from "express";
import { RoomIdInput } from "../modules/room/room.schema";
import { getRoomService } from "../modules/room/room.service";

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
    if(!res.locals.user) {
        return res.status(401).send("Unauthorized");
    }
    return next();
}

export const isRoomOwner = async (req: Request<RoomIdInput,{},{}>, res: Response, next: NextFunction) => {
    const {roomId} = req.params;
    const {id} = res.locals.user;
    const room = await getRoomService(roomId);
    if(!room){
        return res.status(404).send("Room not found");
    }
    else {
        if(room?.user1Id == id || room?.user2Id == id){
            return next();
        }
        else {
            return res.status(403).send("Forbidden");
        }
    }
}