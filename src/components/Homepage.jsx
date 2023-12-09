// Homepage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Homepage.module.css';
import LeftSide from './homepage_components/LeftSide';
import RightSide from './homepage_components/RightSide';
import MainSection from './homepage_components/MainSection';

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

      {userData && (

        <div className="container">
          <LeftSide />

          <MainSection userData={userData}/>

          <RightSide userData={userData}/>
        </div>
      )}


    </div>
  );
}

export default Homepage;
