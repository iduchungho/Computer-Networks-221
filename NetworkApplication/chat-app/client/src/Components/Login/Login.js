import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        console.log("Login");
        let path = `/chatpage`;
        navigate(path);
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
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
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