import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginComponent = ({ setToken }) => {
  const navigate = useNavigate(); // Used to redirect the user

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      const authToken = response.data.token;

      setToken(authToken);

      // Store the token in local storage
      localStorage.setItem('token', authToken);

      console.log('Login successful');

      // Redirect to a new URL with the username as a parameter
      navigate(`/profile/${username}`);
    } catch (error) {
      console.error('Login failed');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginComponent;
