import {z} from 'zod';

const roomCore = {
    roomId : z.string({
        required_error: 'Room Id is required',
    }),
}

export const RoomIdSchema = z.object({
    ...roomCore,
})

export type RoomIdInput = z.infer<typeof RoomIdSchema>;