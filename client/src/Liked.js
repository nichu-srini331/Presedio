import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Liked.css'; // Import the CSS file for styles
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Liked = () => {
  const [likedProperties, setLikedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchLikedProperties = async () => {
      try {
        console.log(userId,"like");
        const response = await axios.post('https://rentifyapp-j2zt7asl6-nichusrini331s-projects.vercel.app/liked-properties', { userId:userId });
        setLikedProperties(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching liked properties:', error);
        setLoading(false);
      }
    };

    fetchLikedProperties();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="liked-properties-container">
    <h2 className="liked-properties-title">Liked Properties</h2>
    <div className="liked-properties-list">
      {likedProperties.map((property) => (
        <Card key={property.id} style={{ width: '18rem', margin: '10px' }}>
          <Card.Img variant="top" src={property.photos[0]} alt={property.title} />
          <Card.Body>
            <Card.Title>{property.title}</Card.Title>
            <Card.Text>
              {property.description}
              <br />
              Address: {property.address}
              <br />
              Price: ${property.price}
              <br />
              Type: {property.type}
              <br />
              Bathrooms: {property.no_of_bath}
              <br />
              Bedrooms: {property.no_of_bed}
              <br />
              Square Feet: {property.square_feet}
              <br />
              Amenities: {property.amenities ? property.amenities: 'N/A'}
              <br />
              Nearby Metro: {property.metro}
              <br />
              Nearby Bus Stand: {property.bus_stand}
              <br />
              Nearby Hospital: {property.hospital}
              <br />
              Nearby School: {property.school}
              <br />
              Nearby Market: {property.market}
              <br />
              Other Details: {property.others}
            </Card.Text>
            <div className="property-card-photos">
              {property.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Property ${index}`}
                  className="property-card-photo"
                  style={{ width: '100%', marginBottom: '10px' }}
                />
              ))}
            </div>
            <Button variant="primary">Contact</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  </div>  );
};

export default Liked;
