import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { memo } from 'react';
import axios from "axios";
import serverURL from "../../config/config";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
    const handleRegister = async () => {
        const data = {
            email: email,
            username: username,
            password: password,
            confirmPassword: confirmPassword
        }
        try { 
            const response = await axios.post(`${serverURL}/api/users/register`,data);
            navigate("/login");
        }
        catch (err) {
            alert(err.response.data);
        }
    }
    return (
        <Container className="w-25 h-100 ">
            <Row>
                <Form className = "mt-4" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick = {handleRegister}>
                        Register
                    </Button>
                </Form>
            </Row>
        </Container>
    );
};

export default memo(Register);