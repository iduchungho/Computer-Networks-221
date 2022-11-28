import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import styles from './VideoCall.module.css';
import { Row, Button, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { getMe } from '../../utils/user.utils';
import { memo } from 'react';
function VideoCall() {
    const [peerId, setPeerId] = useState('');
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const peerInstance = useRef(null);
    const [user,setUser] = useState(null);
    const {friendId} = useParams();
    useEffect(()=>{
        getMe().then((data) => {
            setUser(data);
        }).catch((err) => {
            alert(err.response.data);
        });
        setRemotePeerIdValue(friendId);
    },[friendId])
    useEffect(() => {
        const peer = new Peer(user?.id);
        peer.on('open', (id) => {
            setPeerId(id)
        });
        // Await a call from a remote peer
        peer.on('call', (call) => {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            getUserMedia({ video: true, audio: true }, (mediaStream) => {
                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.play();
                call.answer(mediaStream)
                call.on('stream', function (remoteStream) {
                    remoteVideoRef.current.srcObject = remoteStream
                    remoteVideoRef.current.play();
                });
            });
        })

        peerInstance.current = peer;
    }, [user])
    // Call a remote peer
    const call = (remotePeerId) => {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        getUserMedia({ video: true, audio: true }, (mediaStream) => {
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play();
            const call = peerInstance.current.call(remotePeerId, mediaStream)
            call.on('stream', (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream
                remoteVideoRef.current.play();
            });
        });
    }

    return (
        <Container>
            <Row>
                <Button className = "mt-3" onClick={() => call(remotePeerIdValue)}>Click here to start a call or accept a call</Button>
            </Row>
            <Row>
                <div className={styles.videoContainer}>
                    <div>
                        <h3>Your video :</h3>
                        <video className={styles.video} ref={currentUserVideoRef} />
                    </div>
                    <div>
                        <h3>Your friend's video :</h3>
                        <video className={styles.video} ref={remoteVideoRef} />
                    </div>
                </div>
            </Row>
        </Container>
    );
}

export default memo(VideoCall);