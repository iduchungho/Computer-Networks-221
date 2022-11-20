import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../Sidebar/Sidebar";
import styles from './Chatpage.module.css';
import clsx from 'clsx';
const Chatpage = () => {
    return (
        <Container fluid className="h-100">
            <Row className="h-100">
                <Col xs={2} className={styles.sidebar}>
                    <Sidebar />
                </Col>
                <Col xs={10} className={clsx("bg-light,ml-3")}>
                    <Row className = {clsx(styles.chatInfo)}>
                            <Col xs={10}>
                                Tri van
                            </Col>
                            <Col xs={2}>
                                See friend video
                            </Col>
                    </Row>
                    <Row className={clsx(styles.chatContent)}>
                        Chat content
                    </Row>
                    <Row>
                        <Form className={clsx(styles.chatInput,"w-100","d-flex","mb-4")}>
                            <Form.Group className={clsx(styles.chatInput,"w-100")}>
                                <Form.Control type="text" placeholder="Aa" />
                            </Form.Group>
                            <Button className = {clsx(styles.sendBtn)} variant="primary">
                                Send
                            </Button>{' '}
                        </Form>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Chatpage;