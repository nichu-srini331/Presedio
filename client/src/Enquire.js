import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Enq.css'; // Import the CSS file for styles
import API_BASE_URL from './config';
import { Card, Button,Modal} from 'react-bootstrap';

const EnquiredProperties = () => {
  const [enquiredProperties, setEnquiredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  console.log(userId,"enquiry")
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  

  useEffect(() => {
    const fetchEnquiredProperties = async () => {
     
      try {
        const response = await axios.post(`${API_BASE_URL}/enquired-properties`, { userId:userId });
        setEnquiredProperties(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching enquired properties:', error);
        setLoading(false);
      }
    };

    fetchEnquiredProperties();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleShowModal = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  return (
    <div className="enquired-properties-container">
      <h2 className="enquired-properties-title">Enquired Properties</h2>
      <div className="enquired-properties-list">
        {enquiredProperties.map((property) => (
          <Card key={property.id} style={{ width: '18rem', margin: '1rem' }}>
            {property.photos.length > 0 && (
              <Card.Img variant="top" src={property.photos[0]} alt={`Property ${property.title}`} />
            )}
            <Card.Body>
              <Card.Title>{property.title}</Card.Title>
              <Card.Text>Price: ${property.price}</Card.Text>
              <Card.Text>Type: {property.type}</Card.Text>
              <Card.Text>Bedrooms: {property.no_of_bed}</Card.Text>
              <Button variant="primary" onClick={() => handleShowModal(property)}>More</Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {selectedProperty && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProperty.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProperty.photos.length > 0 && (
              <img src={selectedProperty.photos[0]} alt={`Property ${selectedProperty.title}`} className="img-fluid" />
            )}
            <p>{selectedProperty.description}</p>
            <p>Address: {selectedProperty.address}</p>
            <p>Price: ${selectedProperty.price}</p>
            <p>Type: {selectedProperty.type}</p>
            <p>Bathrooms: {selectedProperty.no_of_bath}</p>
            <p>Bedrooms: {selectedProperty.no_of_bed}</p>
            <p>Square Feet: {selectedProperty.square_feet}</p>
            <p>Amenities: {selectedProperty.amenities}</p>
            <p>Nearby Metro: {selectedProperty.metro}</p>
            <p>Nearby Bus Stand: {selectedProperty.bus_stand}</p>
            <p>Nearby Hospital: {selectedProperty.hospital}</p>
            <p>Other Details: {selectedProperty.others}</p>
            <p>Likes: {selectedProperty.likes}</p>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>

  );
};

export default EnquiredProperties;
