import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from './rentify.jpeg'
import SignupForm from './SignupFor';
import post from './rentpost.jpeg';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Register() {
    const navigate = useNavigate();
   
  return (
    <div>
        <Container>
            <Row>
                <Col className='logo'>
                <img src={logo} width={220} height={180}/>
                </Col>
            </Row>
            <Row>
                <Col><img src={post} width={400} height={400} className='post'/></Col>
                <Col className='sign'> <SignupForm/> </Col>
                
               
            </Row>
        </Container>
    </div>
  )
}

export default Register