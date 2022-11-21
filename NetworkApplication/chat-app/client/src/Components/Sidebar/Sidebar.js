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
import { getFriendList, getMe, search } from '../../utils/user.utils';
const Sidebar = (props) => {
    const [user, setUser] = useState(null);
    const [friendList, setFriendList] = useState([]);
    const [friendName, setFriendName] = useState("");
    const [suggestions, setSuggestions] = useState([]);
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
    const handleClickOnFriend = async (friend) => {

        props.onClickOnFriendName(friend);
    }
    useEffect(() => {
        getMe().then((data) => {
            setUser(data);
        })
            .catch((err) => {
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
                        <Card key={friend.id} className={clsx(styles.friendContainer)} onClick = {() => handleClickOnFriend(friend)}>
                            <Card.Body className={clsx(styles.friendContainer)}>{friend.username}</Card.Body>
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

export default Sidebar;