import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SideBar.module.css';
import ClubCard from './sidebar_components/ClubCard';

const SideBar = ({ userData }) => {
  const [member, setMember] = useState([]);
  const [follower, setFollower] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUserRolesClubsData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_clubs_roles', {
          headers: { Authorization: `${token}` },
        });

        console.log('Full Response:', response);
        console.log('User Roles Clubs Data:', response.data.userRolesClubs);

        // The data is separated into two arrays, one for member and one for follower
        const memberData = response.data.userRolesClubs.filter(
          (item) =>
            (item.role_name === 'Owner' ||
              item.role_name === 'Member' ||
              item.role_name === 'Moderator') &&
            item.is_approved === 1
        );

        const followerData = response.data.userRolesClubs.filter(
          (item) => item.role_name === 'Follower'
        );

        setMember(memberData);
        setFollower(followerData);

        console.log('Member Data:', memberData);
        console.log('Follower Data:', followerData);

      } catch (error) {
        console.error('Failed to fetch user roles clubs data', error);
      }
    };

    fetchUserRolesClubsData();
  }, []); // No dependencies, so it only runs once on mount


  return (
    <div className={styles.sidebar}>
      <div className={styles.seperator} style={{height: 'calc(100vh - 60px)'}}>

        <div className={styles.sidelogo}>
          <img style={{width: '65px', height: '65px', marginRight: '10px'}} src="/Logo.png" alt="" />
          <p className={styles.logofont}>AutoClub</p>
        </div>

        <div className={styles.profilesection}>
          <img src={userData.p_image_link} alt="Img" style={{width: '50px', height: '50px', borderRadius: '50px'}} />
          <p style={{paddingLeft: '10px'}}>{userData.username}</p>
        </div>

        <div className={styles.clubsection}>

            <div className={styles.title}>
              <p>MEMBER {member.length}</p>
            </div>

            <div className={styles.scrollable}>
              {member.map((item, index) => (
                <ClubCard key={index} clubname={item.name} image={item.small_img_url}/>
              ))}
            </div>

            <div className={styles.title}>
              <p>FOLLOWING {follower.length}</p>
            </div>

            <div className={styles.scrollable}>
              {follower.map((item, index) => (
                <ClubCard key={index} clubname={item.name} image={item.small_img_url}/>
              ))}
            </div>

        </div>



      </div>
    </div>
  );
}

export default SideBar;
