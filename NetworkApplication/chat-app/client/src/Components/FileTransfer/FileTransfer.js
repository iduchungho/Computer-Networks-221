import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { getMe } from '../../utils/user.utils';
import { memo } from 'react';
function FileTransfer() {
    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }
    const b64toBlob = (base64, type = 'application/octet-stream') => 
    fetch(`data:${type};base64,${base64}`).then(res => res.blob())
    const [peerId, setPeerId] = useState('');
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const peerInstance = useRef(null);
    const [user, setUser] = useState(null);
    const [sentFile, setSentFile] = useState(null);
    const [receiveFile, setReceiveFile] = useState({});
    const { friendId } = useParams();
    useEffect(() => {
        getMe().then((data) => {
            setUser(data);
        }).catch((err) => {
            alert(err.response.data);
        });
        setRemotePeerIdValue(friendId);
    }, [friendId])
    useEffect(() => {
        const peer = new Peer(user?.id);
        peer.on('open', (id) => {
            setPeerId(id)
        });
        // Await file from a remote peer
        peer.on('connection', (conn) => {
            conn.on('data', async ({sentFile,contentType,fileName}) => {
                const base64String = arrayBufferToBase64(sentFile);
                const blob = await b64toBlob(base64String,contentType);
                // create url for download
                const url = URL.createObjectURL(blob);
                setReceiveFile({url,fileName,contentType});
            });
        })
        peerInstance.current = peer;
    }, [user])
    const handleSendFile = (e) => {
        const conn = peerInstance.current.connect(remotePeerIdValue);
        conn.on('open', () => {
            const contentType = sentFile.type;
            const fileName = sentFile.name;
            conn.send({sentFile,contentType,fileName});
        });
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={(e) => { e.preventDefault(); handleSendFile() }}>
                        <Form.Group className="position-relative mb-3">
                            <Form.Label>File :</Form.Label>
                            <Form.Control
                                type="file"
                                required
                                name="file"
                                onChange={(e) => { setSentFile(e.target.files[0])}}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Send
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <h2>Received File</h2>
                {receiveFile.url ? <Col>
                    <a href={receiveFile.url}
                        download={receiveFile.fileName}
                    >{receiveFile.fileName}</a>
                </Col> : 
                <Col>
                    <p>No file received</p>
                </Col>
                }
            </Row>
        </Container>
    );
}

export default memo(FileTransfer);