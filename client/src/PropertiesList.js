import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from './firebase'; // Import Firebase auth
import './PropertiesList.css'; // Import the CSS file for styling
import { Card, Button } from 'react-bootstrap';
import API_BASE_URL from './config';

const PropertiesList = ({ email }) => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const id = localStorage.getItem('userId');

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
      await axios.post(`http://localhost:8081/properties/${propertyId}/like`, { userId: id });
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
      await axios.post('http://localhost:8081/enquiry', {
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
        {filteredProperties
          .filter(property => property.owner !== id)
          .map((property) => (
            <Card key={property.id} style={{ width: '18rem', margin: '1rem' }}>
              {property.photos.length > 0 && (
                <Card.Img variant="top" src={property.photos[0]} alt={`Property ${property.title}`} />
              )}
              <Card.Body>
                <Card.Title>{property.title}</Card.Title>
                <Card.Text>{property.description}</Card.Text>
                <Card.Text>Address: {property.address}</Card.Text>
                <Card.Text>Price: ${property.price}</Card.Text>
                <Card.Text>Type: {property.type}</Card.Text>
                <Card.Text>Bathrooms: {property.no_of_bath}</Card.Text>
                <Card.Text>Bedrooms: {property.no_of_bed}</Card.Text>
                <Card.Text>Square Feet: {property.square_feet}</Card.Text>
                <Card.Text>Amenities: {property.amenities}</Card.Text>
                <Card.Text>Nearby Metro: {property.metro}</Card.Text>
                <Card.Text>Nearby Bus Stand: {property.bus_stand}</Card.Text>
                <Card.Text>Nearby Hospital: {property.hospital}</Card.Text>
                <Card.Text>Nearby School: {property.school}</Card.Text>
                <Card.Text>Nearby Market: {property.market}</Card.Text>
                <Card.Text>Other Details: {property.others}</Card.Text>
                <Button variant="primary" onClick={() => handleLike(property.id)}>Like</Button>
                <span className="property-card-like-count">{property.likes}:likes</span>
                <Button variant="secondary" className='btn-enq' onClick={() => handleEnquiry(property.email, property.id)}>
                  Send Enquiry
                </Button>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default PropertiesList;
