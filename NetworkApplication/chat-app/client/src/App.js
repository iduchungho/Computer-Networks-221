import React, { useEffect } from "react";
import {Routes, Route} from 'react-router-dom'
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Header from "./Components/Navbar/Navbar";
import Register from "./Components/Register/Register";
import io from 'socket.io-client';
import { serverURL } from "./config/config";
import { useLocation } from 'react-router-dom';
import Chatpage from "./Components/Chatpage/Chatpage";

// const socket = io(serverURL);
function App(props) {
    const location = useLocation();
    return (
        <>
            {/* Hide header when in chatpage */}
            {location.pathname !== "/chatpage" && <Header/>}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/chatpage" element={<Chatpage/>}/>
            </Routes>
        </>
    )
}

export default App;