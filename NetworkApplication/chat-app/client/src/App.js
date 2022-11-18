import React, { useEffect } from "react";
import {Routes, Route} from 'react-router-dom'
import Home from "./Components/Home";
import Login from "./Components/Login";
import Header from "./Components/Navbar";
import Register from "./Components/Register";
import io from 'socket.io-client';
import { serverURL } from "./config/config";

const socket = io(serverURL);
function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </>
    )
}

export default App;