import React, { useState } from 'react';
import axios from 'axios';
import Homepage from './components/Homepage';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      setToken(response.data.token);

      // Store the token in local storage
      localStorage.setItem('token', response.data.token);

      console.log('Login successful');
    } catch (error) {
      console.error('Login failed');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin}>Login</button>
      </div>
      {token && <div>Your JWT token: {token}</div>}

      {token ? <Homepage token={token} /> : null}
    </div>
  );
}

export default App;
