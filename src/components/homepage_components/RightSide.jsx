import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './RightSide.module.css';
import ClubCard from '../ui_components/club_card/ClubCard';


const RightSide = ({userData}) => {

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
  <div className={styles.right_side}>
    <div className={styles.account}>
      <button className={styles.account_button}>
        <svg stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <path d="M22 6l-10 7L2 6" />
        </svg>
      </button>
      <button className={styles.account_button}>
        <svg stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1" viewBox="0 0 24 24">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
        </svg>
      </button>
      <span className={styles.account_user}>
          {userData.username}
        <img
          src={userData.p_image_link}
          alt=""
          className={styles.account_profile}
        />
        <span>▼</span>
      </span>
    </div>
    <div className={`${styles.side_wrapper} ${styles.stories}`}>
      <div className={styles.side_title}>MEMBER {member.length}</div>
      {/* <div className={styles.user}>
        <img
          src="https://passion-stickers.com/617-home_default/honda-prelude.jpg"
          alt=""
          className={styles.user_img}
        />
        <div className={styles.username}>
          Honda Prelude Club
          <div className="album-date">12 hours ago</div>
        </div>
      </div> */}

      {member.map((item, index) => (
        <ClubCard key={index} clubname={item.name} image={item.small_img_url}/>
      ))}
      
    </div>

    <div className={`${styles.side_wrapper} ${styles}`}>
      <div className={styles.side_title}>FOLLOWING {follower.length}</div>
      
      {/* <div className={styles.user}>
        <img
          src="https://di-uploads-pod16.dealerinspire.com/competitionbmwofsmithtown/uploads/2020/03/new-bmw-logo.jpg"
          className={styles.user_img}
        />
        <div className={styles.contacts_username}>
          BMW CLUB
        </div>
      </div> */}

      {follower.map((item, index) => (
        <ClubCard key={index} clubname={item.name} image={item.small_img_url}/>
      ))}
      
    </div>


    <div className={`${styles.search_bar} ${styles.right_search}`}>
      <input type="text" placeholder="Search" />
    </div>
  </div>

  );
}

export default RightSide;
