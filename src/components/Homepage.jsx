// Homepage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Homepage.module.css';
import LeftSide from './homepage_components/LeftSide';
import RightSide from './homepage_components/RightSide';

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

          <div className="main">
            <div className="search-bar">
              <input type="text" placeholder="Search" />
              <button className="right-side-button">
                <svg
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  stroke="currentColor"
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="css-i6dzq1"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>
          </div>

          <RightSide userData={userData}/>
        </div>
      )}


    </div>
  );
}

export default Homepage;
