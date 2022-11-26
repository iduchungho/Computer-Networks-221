import { memo, useEffect, useRef, useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap'
import clsx from 'clsx'
import FriendBehavior from '../FriendBehavior/FriendBehavior';
import messageStyles from './RoomPage.module.css'
import { useParams } from 'react-router-dom';
import { getMe, getRoom } from '../../utils/user.utils';
import { useLayoutEffect } from 'react';
function RoomPage({ friend, styles , socket}) {
    const [message, setMessage] = useState("");
    const [sender, setSender] = useState("");
    const [messages, setMessages] = useState([]);
    const messageContainer = useRef(null);
    const [isReceiveMessage, setIsReceiveMessage] = useState(true);
    // get room Id by use params
    const { roomId } = useParams();
    useEffect(() => {
        getMe().then((data) => {
            setSender(data);
        }).catch((err) => {
            alert(err.response.data);
        });
        getRoom(roomId).then((data) => {
            console.log(data);
            setMessages(data.messages);
        }).catch((err) => {
            alert(err.response.data);
        })
    }, [roomId]);
    useLayoutEffect(()=>{
        messageContainer.current.scrollTop = messageContainer.current.scrollHeight - messageContainer.current.clientHeight
    },[messages])
    // listen receive message event
    useEffect(() => {
        socket.on("receive-message", (data) => {
            getRoom(roomId).then((data) => {
                setMessages(data.messages);
            }).catch((err) => {
            })
        })
    }, [messages, socket, roomId]);
    const handleSendMessage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (message) {
            socket.emit('send-message', { message, sender, roomId ,friend});
            getRoom(roomId).then((data) => {
                setMessages(data.messages);
            })
            setMessage("");
        }
    }
    return (
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
                <Row className={clsx(messageStyles.messageContainer)} ref={messageContainer}>
                    {
                        messages.map((message, index) => {
                            return (
                                <div key={message.id} className={clsx("card",messageStyles.message)}>
                                    <div className="card-title">{message.user.username}</div>
                                    <div className="card-body">
                                        {message.content}
                                    </div>
                                </div>
                            )
                        })
                    }
                </Row>
                <Row>
                    <Form className={clsx(styles.chatInput, "w-100", "d-flex", "mb-4")} onSubmit= {handleSendMessage}>
                        <Form.Group className={clsx(styles.chatInput, "w-100")}>
                            <Form.Control type="text" placeholder="Aa" onChange={(e) => setMessage(e.target.value)} value={message}/>
                        </Form.Group>
                        <Button className={clsx(styles.sendBtn)} variant="primary" type ="submit">
                            Send
                        </Button>{' '}
                    </Form>
                </Row>
            </Col>
            <Col xs={2} className={styles.friendBar}>
                <FriendBehavior />
            </Col>
        </>
    )
}

export default memo(RoomPage);