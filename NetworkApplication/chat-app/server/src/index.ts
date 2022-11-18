/*
** Import library
*/
import express from 'express';
import http from 'http';
import cors from 'cors';
import logger from './utils/logger';
import { Server, Socket } from "socket.io";
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
/*
** Constant
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
** Route, middleware
*/

/*
** Socket IO
*/
io.on('connection', (socket: Socket) => {
    logger.info(`Client connected: ${socket.id}`);
    socket.on('disconnect', () => {
        logger.info('user disconnected');
    });
})
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
/*
** Start server
*/
httpServer.listen(process.env.PORT, () => {
    logger.info(`Server is running on port ${process.env.PORT}`);
});