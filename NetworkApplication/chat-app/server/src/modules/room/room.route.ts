import { processRequestParams } from 'zod-express-middleware';
import express from 'express'
import { RoomIdSchema } from './room.schema';
import { getRoomController } from './room.controller';
import { isRoomOwner } from '../../middlewares/requireUser';
const roomRouter = express.Router()
roomRouter.get('/:roomId',isRoomOwner,processRequestParams(RoomIdSchema),getRoomController)
export default roomRouter;