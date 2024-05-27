import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './Login.css'; // Import the CSS file for styling
import logo from './rent-logo.png'
import API_BASE_URL from './config';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
      if (response.status === 200) {
        console.log(response.data.email,"sumi")
        const userId = response.data.userId; // Get the user ID from the response
        const email = response.data.email;
        localStorage.setItem('userId', userId);
        login(userId); // Update authentication state with the user ID
        navigate(`/?userId=${userId}&email=${email}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  const submit = () => {
    
    navigate('/Reg');
  };

  return (
    <div className='login-w'>
          <img src={logo} width={300} height={340} className='logo-login'/>
    <div className='login-wrapper'>
<div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form-group">
          <label className="login-label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
        </div>
        <div className="login-form-group">
          <label className="login-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
        </div>
        {error && <p className="login-error-message">{error}</p>}
        <button type="submit" className="login-button">Login</button>
        <p className="login-register-link">
          Don't have an account?{' '}
          <button type="button" onClick={submit} className="register-button-link">Click here</button>
        </p>
      </form>
    </div>
    </div>
    </div>
    
  );
};

export default Login;
