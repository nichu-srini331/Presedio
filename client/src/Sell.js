import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import './Sell.css'; // Import the CSS file

const Sell = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get('userId'); // Access the user ID from query parameters
  const [propertyDetails, setPropertyDetails] = useState({
    title: '',
    description: '',
    address: '',
    price: '',
    contact: '',
    email: '',
    type: '',
    photos: [],
    no_of_bath: 0,
    no_of_bed: 0,
    square_feet: 0,
    amenities: '',
    metro: '',
    bus_stand: '',
    hospital: '',
    school: '',
    market: '',
    others: '',
    owner:userId
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photos') {
      setPropertyDetails({ ...propertyDetails, photos: files });
    } else {
      setPropertyDetails({ ...propertyDetails, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in propertyDetails) {
      if (key === 'photos') {
        for (let i = 0; i < propertyDetails.photos.length; i++) {
          formData.append('photos', propertyDetails.photos[i]);
        }
      } else {
        formData.append(key, propertyDetails[key]);
      }
    }

    try {
      const response = await axios.post('https://rentifyapp-j2zt7asl6-nichusrini331s-projects.vercel.app/properties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Property registered successfully:', response.data);
      // Clear the form
      setPropertyDetails({
        title: '',
        description: '',
        address: '',
        price: '',
        contact: '',
        email: '',
        type: '',
        photos: [],
        no_of_bath: 0,
        no_of_bed: 0,
        square_feet: 0,
        amenities: '',
        metro: '',
        bus_stand: '',
        hospital: '',
        school: '',
        market: '',
        others: '',
        owner:''
      });
      alert("Registeration Succesfull");
      navigate("/");
    } catch (error) {
      console.error('Error registering property:', error);
    }

  };

  return (
    <div className="sell-container">
      <h2 className="sell-title">Register Property for Sale</h2>
      <form className="sell-form" onSubmit={handleSubmit}>
        <label htmlFor="title" className="sell-label">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={propertyDetails.title}
          onChange={handleChange}
          className="sell-input"
          required
        />

        <label htmlFor="description" className="sell-label">Description</label>
        <textarea
          id="description"
          name="description"
          value={propertyDetails.description}
          onChange={handleChange}
          rows="4"
          className="sell-textarea"
          required
        />

        <label htmlFor="address" className="sell-label">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={propertyDetails.address}
          onChange={handleChange}
          className="sell-input"
          required
        />

        <label htmlFor="price" className="sell-label">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={propertyDetails.price}
          onChange={handleChange}
          className="sell-input"
          required
        />

        <label htmlFor="contact" className="sell-label">Contact Information</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={propertyDetails.contact}
          onChange={handleChange}
          className="sell-input"
          required
        />

        <label htmlFor="email" className="sell-label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={propertyDetails.email}
          onChange={handleChange}
          className="sell-input"
          required
        />

        <label htmlFor="type" className="sell-label">Property Type</label>
        <select
          id="type"
          name="type"
          value={propertyDetails.type}
          onChange={handleChange}
          className="sell-select"
          required
        >
          <option value="">Select Type</option>
          <option value="flat">Flat</option>
          <option value="individual house">Individual House</option>
          <option value="plot">Plot</option>
          <option value="pg">PG</option>
        </select>

        <label htmlFor="no_of_bath" className="sell-label">Number of Bathrooms</label>
        <input
          type="number"
          id="no_of_bath"
          name="no_of_bath"
          value={propertyDetails.no_of_bath}
          onChange={handleChange}
          className="sell-input"
          required
        />

        <label htmlFor="no_of_bed" className="sell-label">Number of Bedrooms</label>
        <input
          type="number"
          id="no_of_bed"
          name="no_of_bed"
          value={propertyDetails.no_of_bed}
          onChange={handleChange}
          className="sell-input"
          required
        />

        <label htmlFor="square_feet" className="sell-label">Square Feet</label>
        <input
          type="number"
          id="square_feet"
          name="square_feet"
          value={propertyDetails.square_feet}
          onChange={handleChange}
          className="sell-input"
          required
        />

        <label htmlFor="amenities" className="sell-label">Amenities</label>
        <input
          type="text"
          id="amenities"
          name="amenities"
          value={propertyDetails.amenities}
          onChange={handleChange}
          className="sell-input"
          required
        />

        <label htmlFor="metro" className="sell-label">Nearby Metro</label>
        <input
          type="text"
          id="metro"
          name="metro"
          value={propertyDetails.metro}
          onChange={handleChange}
          className="sell-input"
          required
        />

        <label htmlFor="bus_stand" className="sell-label">Nearby Bus Stand</label>
        <input
          type="text"
          id="bus_stand"
          name="bus_stand"
          value={propertyDetails.bus_stand}
          onChange={handleChange}
          className="sell-input"
          required
        />

        <label htmlFor="hospital" className="sell-label">Nearby Hospital</label>
        <input
          type="text"
          id="hospital"
          name="hospital"
          value={propertyDetails.hospital}
          onChange={handleChange}
          className="sell-input"
          required
        />

        <label htmlFor="school" className="sell-label">Nearby School</label>
        <input
          type="text"
          id="school"
          name="school"
          value={propertyDetails.school}
          onChange={handleChange}
          className="sell-input"
          required
        />

        <label htmlFor="market" className="sell-label">Nearby Market</label>
        <input
          type="text"
          id="market"
          name="market"
          value={propertyDetails.market}
          onChange={handleChange}
          className="sell-input"
          required
        />

        <label htmlFor="others" className="sell-label">Other Details</label>
        <textarea
          id="others"
          name="others"
          value={propertyDetails.others}
          onChange={handleChange}
          rows="2"
          className="sell-textarea"
        />

        <label htmlFor="photos" className="sell-label">Upload Photos</label>
        <input
          type="file"
          id="photos"
          name="photos"
          onChange={handleChange}
          className="sell-input"
          multiple
          required
        />

        <button type="submit" className="sell-button">Submit</button>
      </form>
    </div>
  );
};

export default Sell;
