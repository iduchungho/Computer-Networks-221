import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import serverURL from "../../config/config";
import getMe from "../../utils/getMe";


const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const input = {
                email: email,
                password: password
            }
            const {data} = await axios.post(`${serverURL}/api/users/login`,input);
            localStorage.setItem("accessToken",data.accessToken);
            localStorage.setItem("refreshToken",data.refreshToken);
            const user = await getMe();
            if(user) {
                navigate("/chatpage");
            }
        }
        catch (err) {
            alert(err.response.data);
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        handleLogin();
    }
    return (
        <Container className="w-25 h-100">
            <Row>
                <Form className = "mt-4" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Row>
        </Container>
    );
};

export default Login;