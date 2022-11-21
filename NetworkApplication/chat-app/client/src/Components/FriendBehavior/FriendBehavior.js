import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import clsx from 'clsx';
import { useState } from 'react';
import { search } from '../../utils/user.utils';
import Card from 'react-bootstrap/Card';
import styles from './FriendBehavior.module.css';
const FriendBehavior = (props) => {
    const [friendName, setFriendName] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(friendName);
        const result = await search(friendName);
        setSuggestions(result);
        if(result.length === 0) {
            alert("No result");
            //clear input
            setFriendName("");
        }
    }
    return (
        <Container className="h-100">
            <Row>
                <h1>Find friends</h1>
                <Form className="d-flex p-0" onSubmit = {handleSubmit}>
                    <Form.Control
                        type="search"
                        placeholder="Search your friend's name"
                        aria-label="Search"
                        onChange = {(e) => setFriendName(e.target.value)}
                    />
                </Form>
            </Row>
            <Row className = {clsx(styles.suggestionsContainer)}>
                {
                    suggestions.map((suggestion) => {
                        return (
                            <Card key={suggestion.id} className={clsx(styles.suggestionContainer, "mt-2")}>
                                <Card.Body>{suggestion.username}</Card.Body>
                                <Button className = {clsx(styles.addFriendBtn)} variant="success">Add friend</Button>{' '}
                            </Card>
                        )
                    }
                    )
                }
            </Row>
            <Row>
                <div>Received friend requests</div>
                <Button variant="success">Click here to accept</Button>{' '}
            </Row>
        </Container>
    );
}
export default FriendBehavior;