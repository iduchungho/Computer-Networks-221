import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Header from "./Components/Navbar/Navbar";
import Register from "./Components/Register/Register";
import io from 'socket.io-client';
import serverURL from "./config/config";
import { useLocation } from 'react-router-dom';
import Chatpage from "./Components/Chatpage/Chatpage";
import PrivateRoutes from "./utils/privateRoutes";
import Error from "./Components/Error/Error";
import { memo } from 'react';
import RoomPage from "./Components/RoomPage/RoomPage";
import VideoCall from "./Components/VideoCall/VideoCall";
import FileTransfer from "./Components/FileTransfer/FileTransfer";

const socket = io(serverURL);
function App(props) {
    const location = useLocation();
    // for room 
    const [friendRoom, setFriendRoom] = useState(null);
    const [stylesRoom, setStylesRoom] = useState(null);
    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected to socket");
        })
        socket.on("disconnect", () => {
            console.log("disconnected from socket");
        })
        return () => {
            socket.off("connect");
            socket.off("disconnect");
        }
    },[]);
    return (
        <>
            {/* Hide header when in chatpage */}
            {(!location.pathname.includes('/chatpage')) && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<PrivateRoutes />}>
                    <Route path='/chatpage' element={<Chatpage socket ={socket} setFriendRoom={setFriendRoom} setStylesRoom={setStylesRoom} />}>
                        <Route path=":roomId" element={<RoomPage socket={socket} friend={friendRoom} styles={stylesRoom} />}>
                        </Route>
                    </Route>
                    <Route path="/chatpage/videoCall/:friendId" element = {<VideoCall friend={friendRoom}/>}/>
                    <Route path="/chatpage/fileTransfer/:friendId" element = {<FileTransfer friend={friendRoom}/>}/>
                </Route>
                <Route path='/*' element={<Error />} />
            </Routes>
        </>
    )
}

export default memo(App);