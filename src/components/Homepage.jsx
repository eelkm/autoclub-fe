// Homepage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Homepage.module.css';
import LeftSide from './homepage_components/LeftSide';
import RightSide from './homepage_components/RightSide';
import MainSection from './homepage_components/MainSection';
import { useGlobalContext } from '../contexts/GlobalContext';
import { useNavigate, useLocation } from 'react-router-dom';


function Homepage({ token }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {setCurrentUser, setCurrentUserImg} = useGlobalContext();
  const [userData, setUserData] = useState(null);


  useEffect(() => {

    // Gets the username of the logged in user
    const fetchUsername = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/get_username', {
          headers: {
            'Authorization': token,
          },
        });

        const data = response.data;

        if (response.status === 200) {
          setCurrentUser(data.username);
          setCurrentUserImg(data.p_image_link);
        } else {
          console.error('Error:', data.error);
        }
      } catch (error) {
        console.error('Failed to fetch username:', error);
      }
    };

    // Gets the user data of the user whose profile is being viewed
    const fetchUserData = async () => {
      try {
        const usernameToSearch = location.pathname.split("/profile/")[1];

        const response = await axios.get(`http://localhost:5000/get_user?username=${usernameToSearch}`, {
          headers: { Authorization: `${token}` },
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchUsername();
    fetchUserData();
  }, [token, location.pathname]); // Fetch user data when token or location.pathname changes

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
