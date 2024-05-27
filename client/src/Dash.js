// Dashboard.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from './rentify.jpeg'
import './dash.css';

import ProfileDropdown from './ProfileDropdown';
import SearchBar from './SearchBar';
import { useNavigate,useLocation } from 'react-router-dom';
import Liked from './Liked';
import PropertiesList from './PropertiesList';
import Enquire from './Enquire';
import Myproperty from './Myproperty';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const[likes,setLike] = useState(false);
  const[enquire,setEnquire] = useState(false);
  const[property,setProperty] = useState(false);
  const[allprop,setallprop] = useState(true)

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get('userId'); // Access the user ID from query parameters
  const email = params.get('email');



  console.log(userId,"srini")

  const sell = () => {
    navigate(`/sell?userId=${userId}`);

  }

  const handleLogoClick =() =>{
    navigate('/')
  }

  const Likeds = () => {
    setallprop(false);
    setLike(true)
    setEnquire(false);
    setProperty(false)

  }
  const Enquired = () => {
    setallprop(false);
    setLike(false)
    setEnquire(true);
    setProperty(false)
  }
  const Property = () => {
    setallprop(false);
    setLike(false)
    setEnquire(false);
    setProperty(true)
  }

  const allProperty =() => {
    setallprop(true);
    setLike(false)
    setEnquire(false);
    setProperty(false)
  }

  return (
    <div>
        <Container>
            <Row>
              <Col className='logo-dash'>
                <img src={logo} width={240} height={200} onClick={handleLogoClick} />   
                </Col>
                
                <Col className='menu'><button className='men' onClick={Likeds}>Liked</button>
                    <button className='men' onClick={Enquired}>Enquired</button>
                    <button className='men' onClick={Property}>My Property</button> 
                    <button className='men' onClick={allProperty}>All </button> 
                    </Col>
                <Col md="auto" className='mid-dash'>
                
                <button className='btn-dash' onClick={sell}>Sell a property</button>
                </Col>
                <Col xs lg="2">
                    
                    <ProfileDropdown className='profile'/></Col>
            </Row>
            <Row>
               
                
            </Row>
            <Row>
                <div>{allprop&&<PropertiesList id={userId} email={email}/>}</div>
                {likes && <Liked userId={userId}/>}
                {enquire && <Enquire userId={userId}/> }
                {property && <Myproperty userId={userId}/>}

            </Row>
        </Container>
      {/* <h1>Welcome to the Dashboard</h1>
      <button onClick={logout}>Logout</button> */}
    </div>
  );
};

export default Dashboard;
