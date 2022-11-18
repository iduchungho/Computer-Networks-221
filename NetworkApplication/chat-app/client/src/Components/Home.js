import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Home = () => {
    let navigate = useNavigate(); 
    const loginPage = () =>{ 
      let path = `/login`; 
      navigate(path);
    }
    const registerPage = () =>{
        let path = `/register`; 
        navigate(path);
    }
    return (
        <Container className = "h-100 mt-5">
            <Row className = "d-flex flex-column align-items-center justify-content-center">
            <Button onClick={loginPage} className = "w-25 mt-3"variant="primary">Register</Button>{' '}
            <Button onClick = {registerPage}className = "w-25 mt-3" variant="primary">Login</Button>{' '}
            </Row>
        </Container>
    );
};

export default Home;