import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import Homepage from './components/Homepage';

function App() {
  const [token, setToken] = useState('');

  // Check for token in localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    // Remove the token from both state and localStorage
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <div>
      {token ? (
        <div>
          <Homepage token={token} />
          <button onClick={handleLogout} className='logoutbtn'>Logout</button>
        </div>
      ) : (
        <div>
          <RegisterComponent />
          <LoginComponent setToken={setToken}/>
        </div>
      )}
      {/* {token && <div>Your JWT token: {token}</div>} */}
    </div>
  );
}

export default App;
