import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import clsx from 'clsx';
import Card from 'react-bootstrap/Card';
import styles from './Sidebar.module.css';
import axios from 'axios';
import serverURL from '../../config/config';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import getMe from '../../utils/getMe';
const Sidebar = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const {data} = await axios.get(`${serverURL}/api/users/logout`,{
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`,
                    'x-refresh' : `${localStorage.getItem("refreshToken")}`
                }
            });
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/");
        }
        catch (err) {
            alert(err.response.data);
        }
    }
    const [user,setUser] = useState(null);
    useEffect(() => {
        getMe().then((data) => {
            setUser(data);
        })
        .catch((err) => {
            alert(err.response.data);
        })
    },[])
    return (
        <Container className="h-100">
            <Row>
                <h1>Chats</h1>
                <Form className="d-flex p-0">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </Form>
            </Row>
            <Row className={clsx(styles.listFriendContainer)}>
                <Card className = {clsx(styles.friendContainer)}>
                    <Card.Body className = {clsx(styles.friendContainer)}>Tri Van</Card.Body>
                </Card>
                <Card className = {clsx(styles.friendContainer)}>
                    <Card.Body className = {clsx(styles.friendContainer)}>Tri Van</Card.Body>
                </Card>
                <Card className = {clsx(styles.friendContainer)}>
                    <Card.Body className = {clsx(styles.friendContainer)}>Tri Van</Card.Body>
                </Card>
                <Card className = {clsx(styles.friendContainer)}>
                    <Card.Body className = {clsx(styles.friendContainer)}>Tri Van</Card.Body>
                </Card>
                <Card className = {clsx(styles.friendContainer)}>
                    <Card.Body className = {clsx(styles.friendContainer)}>Tri Van</Card.Body>
                </Card>
                <Card className = {clsx(styles.friendContainer)}>
                    <Card.Body className = {clsx(styles.friendContainer)}>Tri Van</Card.Body>
                </Card>
                <Card className = {clsx(styles.friendContainer)}>
                    <Card.Body className = {clsx(styles.friendContainer)}>Tri Van</Card.Body>
                </Card>
                <Card className = {clsx(styles.friendContainer)}>
                    <Card.Body className = {clsx(styles.friendContainer)}>Tri Van</Card.Body>
                </Card>
                <Card className = {clsx(styles.friendContainer)}>
                    <Card.Body className = {clsx(styles.friendContainer)}>Tri Van</Card.Body>
                </Card>
                <Card className = {clsx(styles.friendContainer)}>
                    <Card.Body className = {clsx(styles.friendContainer)}>Tri Van</Card.Body>
                </Card>
                <Card className = {clsx(styles.friendContainer)}>
                    <Card.Body className = {clsx(styles.friendContainer)}>Tri Van</Card.Body>
                </Card>
                <Card className = {clsx(styles.friendContainer)}>
                    <Card.Body className = {clsx(styles.friendContainer)}>Tri Van</Card.Body>
                </Card>
                <Card className = {clsx(styles.friendContainer)}>
                    <Card.Body className = {clsx(styles.friendContainer)}>Tri Van</Card.Body>
                </Card>

                                <Card className = {clsx(styles.friendContainer)}>
                    <Card.Body className = {clsx(styles.friendContainer)}>Tri Van</Card.Body>
                </Card>
                                <Card className = {clsx(styles.friendContainer)}>
                    <Card.Body className = {clsx(styles.friendContainer)}>Tri Van</Card.Body>
                </Card>
                <Card className = {clsx(styles.friendContainer)}>
                    <Card.Body className = {clsx(styles.friendContainer)}>Tri Van</Card.Body>
                </Card>

                                <Card className = {clsx(styles.friendContainer)}>
                    <Card.Body className = {clsx(styles.friendContainer)}>Tri Van</Card.Body>
                </Card>
            </Row>
            <Row>
                <div className={clsx(styles.username)}>Hi, {user?.username}</div>
                <Button variant="primary" onClick = {handleLogout}>Logout</Button>
            </Row>
        </Container>
    );
}

export default Sidebar;