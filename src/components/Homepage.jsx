// Homepage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Homepage({ token }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('token', token);

        const response = await axios.get('http://localhost:5000/get_user', {
          headers: { Authorization: `${token}` },
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      {userData && (
        <div>
          <h2>User Details</h2>
          <p>Username: {userData.username}</p>
          {/* Display other user details as needed */}
        </div>
      )}
    </div>
  );
}

export default Homepage;
