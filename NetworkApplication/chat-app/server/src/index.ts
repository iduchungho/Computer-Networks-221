/*
* * Import library
*/
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import logger from './utils/logger';
import { Server, Socket } from "socket.io";
import userRouter from './modules/user/user.route';
import { StatusCodes } from 'http-status-codes';
import ExpressError from './utils/expressError';
import deserializeUser from './middlewares/deserializeUser';
import roomRouter from './modules/room/room.route';
import { addMessageService } from './modules/room/room.service';
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

/*
* * Constant
*/
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer,{
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    },
})
/*
* * Route, middleware
*/
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
//? Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(deserializeUser);
//? Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/users', userRouter);
app.use('/api/rooms', roomRouter)
//? Error handler
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    return next(new ExpressError('Not Found', StatusCodes.NOT_FOUND))
})
app.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message)
})
/*
* * Socket IO
*/
io.on('connection', (socket: Socket) => {
    logger.info(`Client connected: ${socket.id}`);
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
    }); 
    socket.on('send-message', async (data) => {
        const {roomId, sender, message} = data;
        const result = await addMessageService(roomId, sender.id, message);
        if(result) {
            io.to(roomId).emit('receive-message', result);
        }
    })
    socket.on('disconnect', () => {
        logger.info('user disconnected');
    });
})
/*
* * Start server
*/
httpServer.listen(process.env.PORT, () => {
    logger.info(`Server is running on port ${process.env.PORT}`);
});