import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from './firebase'; // Import Firebase auth
import './PropertiesList.css'; // Import the CSS file for styling
import { Card, Button,Modal} from 'react-bootstrap';
import API_BASE_URL from './config';

const PropertiesList = ({ email }) => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const id = localStorage.getItem('userId');
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(10);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/properties`);
        setProperties(response.data);
        setFilteredProperties(response.data);
        
        console.log(id,"My id")
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [id]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const results = properties.filter((property) => {
      const title = property.title ? property.title.toLowerCase() : '';
      const description = property.description ? property.description.toLowerCase() : '';
      const address = property.address ? property.address.toLowerCase() : '';
      const price = property.price ? property.price.toString() : '';
      const type = property.type ? property.type.toLowerCase() : '';
      const no_of_bath = property.no_of_bath ? property.no_of_bath.toString() : '';
      const no_of_bed = property.no_of_bed ? property.no_of_bed.toString() : '';
      const square_feet = property.square_feet ? property.square_feet.toString() : '';
      const amenities = property.amenities ? property.amenities.toLowerCase() : '';
      const metro = property.metro ? property.metro.toLowerCase() : '';
      const bus_stand = property.bus_stand ? property.bus_stand.toLowerCase() : '';
      const hospital = property.hospital ? property.hospital.toLowerCase() : '';
      const school = property.school ? property.school.toLowerCase() : '';
      const market = property.market ? property.market.toLowerCase() : '';
      const others = property.others ? property.others.toLowerCase() : '';

      return (
        title.includes(searchTerm.toLowerCase()) ||
        description.includes(searchTerm.toLowerCase()) ||
        address.includes(searchTerm.toLowerCase()) ||
        price.includes(searchTerm) ||
        type.includes(searchTerm.toLowerCase()) ||
        no_of_bath.includes(searchTerm) ||
        no_of_bed.includes(searchTerm) ||
        square_feet.includes(searchTerm) ||
        amenities.includes(searchTerm.toLowerCase()) ||
        metro.includes(searchTerm.toLowerCase()) ||
        bus_stand.includes(searchTerm.toLowerCase()) ||
        hospital.includes(searchTerm.toLowerCase()) ||
        school.includes(searchTerm.toLowerCase()) ||
        market.includes(searchTerm.toLowerCase()) ||
        others.includes(searchTerm.toLowerCase())
      );
    });

    setFilteredProperties(results);
  }, [searchTerm, properties]);

  const handleLike = async (propertyId) => {
    if (user) {
      alert('You need to be logged in to like a property');
      return;
    }

    try {
      await axios.post(`http://localhost:3001/properties/${propertyId}/like`, { userId: id });
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property.id === propertyId
            ? { ...property, likes: property.likes + 1 }
            : property
        )
      );
    } catch (error) {
      console.error('Error liking property:', error);
    }
  };

  const handleEnquiry = async (ownerEmail, propertyId) => {
    console.log(propertyId,"props")
    try {
      await axios.post('http://localhost:3001/enquiry', {
        senderEmail: email,
        ownerEmail: ownerEmail,
        id: id,
        propertyId: propertyId
      });
      alert('Enquiry sent successfully');
    } catch (error) {
      console.error('Error sending enquiry:', error);
      alert('Failed to send enquiry');
    }
  };
  

  const handleShowModal = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="property-list-container">
      <h2 className="property-list-title">Available Properties</h2>
      <input
        type="text"
        className="search-bar"
        placeholder="Search properties by any query ex: 2Bedroom..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="property-list">
        {currentProperties
          .filter(property => property.owner !== id)
          .map((property) => (
            <Card key={property.id} style={{ width: '18rem', margin: '1rem' }}>
              {property.photos.length > 0 && (
                <Card.Img variant="top" src={property.photos[0]} alt={`Property ${property.title}`} />
              )}
              <Card.Body>
                <Card.Title>{property.title}</Card.Title>
                <Card.Text>Price: ${property.price}</Card.Text>
                <Card.Text>Type: {property.type}</Card.Text>
                <Card.Text>Bedrooms: {property.no_of_bed}</Card.Text>
                <p>Likes: {property.likes}</p>
                <div className='btn-card'>
                  <Button variant="secondary" className='btn-enq' onClick={() => handleEnquiry(property.email, property.id)}>
                    Interested
                  </Button>
                  <Button variant="primary" className='btn-like' onClick={() => handleLike(property.id)}>Like</Button>
                </div>
                <span variant="primary" className='btn-more' onClick={() => handleShowModal(property)}>More</span>
              </Card.Body>
            </Card>
          ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredProperties.length / propertiesPerPage) }, (_, index) => (
          <Button key={index + 1} onClick={() => paginate(index + 1)} className="page-link">
            {index + 1} - Page 
          </Button>
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
            <p>Nearby School: {selectedProperty.school}</p>
            <p>Nearby Market: {selectedProperty.market}</p>
            <p>Other Details: {selectedProperty.others}</p>
            <p>Likes: {selectedProperty.likes}</p>
            <Button variant="primary" onClick={() => handleLike(selectedProperty.id)}>Like</Button>
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

export default PropertiesList;
