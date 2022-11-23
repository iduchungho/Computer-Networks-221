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
const Chatpage = () => {
    const [friend, setFriend] = useState(null);
    const getFriendOnSidebar = (friend) => {
        setFriend(friend);
    }
    return (
        <Container fluid className="h-100">
            <Row className="h-100">
                <Col xs={2} className={styles.sidebar}>
                    <Sidebar onClickOnFriendName={getFriendOnSidebar} />
                </Col>
                {friend ?
                    <>
                        <Col xs={8} className={clsx("ml-3")}>
                            <Row className={clsx(styles.chatInfo)}>
                                <Col xs={10}>
                                    {friend ? friend.username : "Select a friend to chat"}
                                </Col>
                                <Col xs={2}>
                                    {friend ? `See ${friend.username}'s video` : ""}
                                </Col>
                            </Row>
                            <Row className={clsx(styles.chatContent)}>
                                Chat content
                            </Row>
                            <Row>
                                <Form className={clsx(styles.chatInput, "w-100", "d-flex", "mb-4")}>
                                    <Form.Group className={clsx(styles.chatInput, "w-100")}>
                                        <Form.Control type="text" placeholder="Aa" />
                                    </Form.Group>
                                    <Button className={clsx(styles.sendBtn)} variant="primary">
                                        Send
                                    </Button>{' '}
                                </Form>
                            </Row>
                        </Col>
                        <Col xs={2} className={styles.friendBar}>
                            <FriendBehavior/>
                        </Col>
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