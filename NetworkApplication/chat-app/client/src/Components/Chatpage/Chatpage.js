import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../Sidebar/Sidebar";
import styles from './Chatpage.module.css';
import clsx from 'clsx';
import { useState } from "react";
import FriendBehavior from "../FriendBehavior/FriendBehavior";
import {Outlet} from 'react-router-dom'
const Chatpage = ({setFriendRoom, setStylesRoom,socket}) => {
    const [friend, setFriend] = useState(null);
    const getFriendOnSidebar = (friend) => {
        setFriend(friend);
        setFriendRoom(friend); 
        setStylesRoom(styles);
    }
    return (
        <Container fluid className="h-100">
            <Row className="h-100">
                <Col xs={2} className={styles.sidebar}>
                    <Sidebar onClickOnFriendName={getFriendOnSidebar} socket = {socket} />
                </Col>
                {friend ?
                    <>
                        <Outlet/>
                    </>
                    :
                    <>
                        <Col xs={8} className={clsx("d-flex", "align-items-center", styles.selectFriendToChat)}>
                            Select a friend to chat
                        </Col>
                        <Col xs={2} className={styles.friendBar}>
                            <FriendBehavior/>
                        </Col>
                    </>
                }
            </Row>
        </Container>
    )
}

export default Chatpage;