import React, { useState } from 'react';
import "./register.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.username.trim() === '') {
      newErrors.username = 'Username is required';
    }

    if (formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    }

    if (formData.password === '') {
      newErrors.password = 'Password is required';
    }

    if (formData.confirmPassword === '') {
      newErrors.confirmPassword = 'Confirm Password is required';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length === 0) {
      
      try {
        await axios.post(BACKEND_URL+"/auth/register",formData);
        toast.success("user created");
        navigate('/signin');
      } catch (error) {
        toast.error('user not created');
      }

      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="registration-form-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
