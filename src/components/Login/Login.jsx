import React, { useState } from 'react';
import "./login.css";
import axios from 'axios';

import { toast } from 'react-toastify';

const Login = ({ setXenonstack }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    const { email,password } = formData;
    console.log("here",formData);
    e.preventDefault();
    const newErrors = {};

    if (formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    }

    if (formData.password === '') {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length === 0) {

      try {
        const response = await axios.post(BACKEND_URL+"/auth/login",{
          email,
          password,
        });

        toast.success("user logged in as : " + email);

        localStorage.setItem('xenonstack',email);
        setXenonstack(email);

      } catch (error) {
        toast.error('user not logged in');
      }
      
      setFormData({
        email: '',
        password: '',
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="login-page-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
};

export default Login;
