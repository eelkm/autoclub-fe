// Homepage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import styles from './Homepage.module.css';

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

      <div className={styles.container}>
        <div className={styles.columnsidebar}>
          {userData && (
          <div>
            <SideBar userData={userData} />
          </div>)}
        </div>
        <div className={styles.middlecolumn}>
            <h2>Column 2</h2>
            <p>asdasd</p>
        </div>
        <div className={styles.columnsidebar}>
            <h2>Column 3</h2>
            <p>asdasd</p>
        </div>
      </div>


    </div>
  );
}

export default Homepage;
