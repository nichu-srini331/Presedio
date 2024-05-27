import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Enq.css'; // Import the CSS file for styles
import API_BASE_URL from './config';

const EnquiredProperties = () => {
  const [enquiredProperties, setEnquiredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

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

  return (
    <div className="enquired-properties-container">
      <h2 className="enquired-properties-title">Enquired Properties</h2>
      <div className="enquired-properties-list">
        {enquiredProperties.map((property) => (
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
            <div className="property-card-photos">
              {property.photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Property ${index}`} className="property-card-photo" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnquiredProperties;
