import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import clsx from 'clsx';
import Card from 'react-bootstrap/Card';
import styles from './Sidebar.module.css';
import axios from 'axios';
import serverURL from '../../config/config';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { memo } from 'react';

import { deleteFriend, getFriendList, getMe } from '../../utils/user.utils';
const Sidebar = ({onClickOnFriendName, socket}) => {
    const [user, setUser] = useState(null);
    const [friendList, setFriendList] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.get(`${serverURL}/api/users/logout`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                    'x-refresh': `${localStorage.getItem("refreshToken")}`
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
    const handleDelete = async (friendId) => {
        console.log(friendId);
        const result = await deleteFriend(friendId);
        if (result.success) {
            const newFriendList = friendList.filter((friend) => friend.id !== friendId);
            setFriendList(newFriendList);
            handleClose();
            // reload window
            window.location.reload(false);
        }
        else {
            alert(`${result.message}`);
        }
    }
    const handleClickOnFriend = async (friend) => {
        onClickOnFriendName(friend);
    }
    useEffect(() => {
        getMe().then((data) => {
            setUser(data);
        }).catch((err) => {
            alert(err.response.data);
        })
        
        getFriendList().then((data) => {
            setFriendList(data);
        }).catch((err) => {
            alert(err.response.data);
        })
    }, [])
    return (
        <Container className="h-100">
            <Row>
                <h1>Chats</h1>
            </Row>
            <Row className={clsx(styles.listFriendContainer)}>
                {friendList.map((friend) => {
                    return (
                        <Card key={friend.id} className={clsx(styles.friendContainer)} onClick={() => {
                                handleClickOnFriend(friend);
                                navigate('/chatpage/' + friend.roomId);
                                socket.emit("join-room", friend.roomId);
                            }}>
                            <Card.Body className={clsx(styles.friendContainer)}>{friend.username}</Card.Body>
                            <Button onClick = {handleShow} className={clsx(styles.deleteBtn)} variant="danger">Delete</Button>{' '}
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Warning</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Do you want to delete your friend ?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(friend.id)}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Card>
                    )
                })}
            </Row>
            <Row>
                <div className={clsx(styles.username)}>Hi, {user?.username}</div>
                <Button variant="primary" onClick={handleLogout}>Logout</Button>
            </Row>
        </Container>
    );
}

export default memo(Sidebar);