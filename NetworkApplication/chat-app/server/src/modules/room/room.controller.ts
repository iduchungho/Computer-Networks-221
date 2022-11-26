import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RoomIdInput } from "./room.schema";
import { getRoomService } from "./room.service";

export const getRoomController = async (req : Request<RoomIdInput,{},{}>, res : Response) => {
    const {roomId} = req.params;
    const result = await getRoomService(roomId);
    if(!result) {
        return res.status(StatusCodes.NOT_FOUND).send("Room not found");
    } else {
        return res.status(StatusCodes.OK).send(result);
    }
};