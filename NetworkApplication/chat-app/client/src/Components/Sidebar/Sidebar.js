import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Sidebar = () => {
    return (
        <div>
            <h1>Chats</h1>
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
            </Form>
        </div>
    );
}

export default Sidebar;