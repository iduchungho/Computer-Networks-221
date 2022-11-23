import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import clsx from 'clsx';
import { useState } from 'react';
import { acceptFriendRequest, addFriend, getPendingRequests, rejectFriendRequest, search } from '../../utils/user.utils';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import styles from './FriendBehavior.module.css';
const FriendBehavior = (props) => {
    const [friendName, setFriendName] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [numberRequests, setNumberRequests] = useState(0);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = async () => {
        const result = await getPendingRequests();
        setPendingRequests(result);
        setNumberRequests(result.length);
        setShow(true)
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const result = await search(friendName);
        setSuggestions(result);
        console.log(suggestions);
        if (result.length === 0) {
            alert("No result");
            //clear input
            setFriendName("");
        }
    }
    const sendFriendRequest = async (suggestion) => {
        const result = await addFriend(suggestion.id);
        if (result.success) {
            alert("Friend request sent");
        }
        else {
            alert(`${result.message}`);
        }
    }
    const acceptFriend = async (request) => {
        const result = await acceptFriendRequest(request.id);
        if (result.success) {
            alert("Friend request accepted");
            // reload window
            window.location.reload(false);
        }
        else {
            alert(`${result.message}`);
        }
    }
    const rejectFriend = async (request) => {
        const result = await rejectFriendRequest(request.id);
        if (result.success) {
            alert("Friend request rejected");
        }
        else {
            alert(`${result.message}`);
        }
    }
    return (
        <Container className="h-100">
            <Row>
                <h1>Find friends</h1>
                <Form className="d-flex p-0" onSubmit={handleSubmit}>
                    <Form.Control
                        type="search"
                        placeholder="Search your friend's name"
                        aria-label="Search"
                        onChange={(e) => setFriendName(e.target.value)}
                    />
                </Form>
            </Row>
            <Row className={clsx(styles.suggestionsContainer)}>
                {
                    suggestions.map((suggestion) => {
                        return (
                            <Card key={suggestion.id} className={clsx(styles.suggestionContainer, "mt-2")}>
                                <Card.Body>{suggestion.username}</Card.Body>
                                <Button onClick={() => sendFriendRequest(suggestion)} className={clsx(styles.addFriendBtn)} variant="success">Add friend</Button>{' '}
                            </Card>
                        )
                    }
                    )
                }
            </Row>
            <Row>
                <div>Received friend requests</div>
                <Button variant="success" onClick={handleShow}>Click here to accept</Button>{' '}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Received {numberRequests} friend requests</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            pendingRequests.map((request) => {
                                return (
                                    <Card key={request.id} className={clsx(styles.suggestionContainer, "mt-2")}>
                                        <Card.Body>{request.username}</Card.Body>
                                        <Button onClick={() => acceptFriend(request)} className={clsx(styles.modalBtn)} variant="success">Accept</Button>{' '}
                                        <Button onClick={() => rejectFriend(request)} className={clsx(styles.modalBtn)} variant="danger">Reject</Button>{' '}
                                    </Card>
                                )
                            })
                        }
                    </Modal.Body>
                </Modal>
            </Row>
        </Container>
    );
}
export default FriendBehavior;