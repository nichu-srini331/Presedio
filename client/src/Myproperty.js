import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Myproperty.css'; // Import the CSS file for styles
import {  Button } from 'react-bootstrap';
import API_BASE_URL from './config';

const Myproperty = () => {
  const [userProperties, setUserProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/user-properties`, { userId:userId });
        setUserProperties(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user properties:', error);
        setLoading(false);
      }
    };

    fetchUserProperties();
  }, [userId]);

  const handleDelete = async (propertyId) => {
    try {
      await axios.delete(`http://localhost:8081/user-properties/${userId}/${propertyId}`);
      setUserProperties(userProperties.filter(property => property.id !== propertyId));
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-properties-container">
      <h2 className="user-properties-title">Your Listed Properties</h2>
      <div className="user-properties-list">
        {userProperties.map((property) => (
          <div key={property.id} className="property-card">
            <h3 className="property-card-title">{property.title}</h3>
            <p className="property-card-description">{property.description}</p>
            <p className="property-card-address">Address: {property.address}</p>
            <p className="property-card-price">Price: ${property.price}</p>
            <p className="property-card-type">Type: {property.type}</p>
            <p className="property-card-details">Bathrooms: {property.no_of_bath}</p>
            <p className="property-card-details">Bedrooms: {property.no_of_bed}</p>
            <p className="property-card-details">Square Feet: {property.square_feet}</p>
            <p className="property-card-details">Amenities: {property.amenities}</p>
            <p className="property-card-details">Nearby Metro: {property.metro}</p>
            <p className="property-card-details">Nearby Bus Stand: {property.bus_stand}</p>
            <p className="property-card-details">Nearby Hospital: {property.hospital}</p>
            <p className="property-card-details">Nearby School: {property.school}</p>
            <p className="property-card-details">Nearby Market: {property.market}</p>
            <p className="property-card-details">Other Details: {property.others}</p>
            <Button onClick={() => handleDelete(property.id)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myproperty;
