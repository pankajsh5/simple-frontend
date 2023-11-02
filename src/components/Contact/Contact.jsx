import React, { useState } from 'react';
import './Contact.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const ContactUs = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessEmail: '',
    phoneNumber: '',
    industry: '',
  });

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Validate form data here
    if (!formData.firstName || !formData.lastName || !formData.businessEmail || !formData.phoneNumber || !formData.industry) {
      setError('Please fill in all the required fields.');
    } else {
      setError('');
      // Handle form submission (e.g., make an API request) here
      console.log('Form data:', formData);
      
      await axios.post(BACKEND_URL+"/contact",formData);
      
      toast.success('Your response was recorded');

      setFormData({
        firstName: '',
        lastName: '',
        businessEmail: '',
        phoneNumber: '',
        industry: '',
      });
    }
  };

  return (
    <div className="container">
      <h1>Contact Us</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="first-name"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="last-name"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="business-email"
            name="businessEmail"
            placeholder="Business Email"
            value={formData.businessEmail}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            id="phone-number"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select Course</option>
            <option value="Web Development">Web Development</option>
            <option value="Flutter Development">Flutter Development</option>
            <option value="Graphic Designing">Graphic Designing</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
