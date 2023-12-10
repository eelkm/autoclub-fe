import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './RightSide.module.css';
import ClubCard from '../ui_components/club_card/ClubCard';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';


const RightSide = ({userData}) => {
  const Navigate = useNavigate();


  // For Logout button animation
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const {setToken, currentUser, currentUserImg } = useGlobalContext();

  const handleMouseClick = () => {
    setIsLogoutHovered(true);
  };

  const handleMouseLeave = () => {
    setIsLogoutHovered(false);
  };

  const handleLogout = () => {
    // Remove the token from both state and localStorage
    setToken('');
    localStorage.removeItem('token');
    Navigate(`/`);
  };


  // Get the user's clubs and roles
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



  // Search bar for following clubs
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFollowers = follower.filter((item) =>
  item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


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
      <span className={styles.account_user} onClick={handleMouseClick} onMouseLeave={handleMouseLeave}>
          {isLogoutHovered? (<div onClick={handleLogout} className={styles.logout}>Logout</div>) : (currentUser)}
          
        <img
          src={currentUserImg}
          alt=""
          className={styles.account_profile}
        />
        <span>▶</span>
      </span>
    </div>

    <div className={`${styles.side_wrapper} ${styles.stories}`}>
      <div className={styles.side_title}>MEMBER {member.length}</div>
      {member.map((item, index) => (
        <ClubCard key={index} clubname={item.name} image={item.small_img_url}/>
      ))}
    </div>

    <div className={`${styles.side_wrapper} ${styles}`}>
      <div className={styles.side_title}>FOLLOWING {follower.length}</div>
      {filteredFollowers.map((item, index) => (
        <ClubCard key={index} clubname={item.name} image={item.small_img_url}/>
      ))}
    </div>

    <div className={`${styles.search_bar} ${styles.right_search}`}>
      <input type="text" placeholder="Search" value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)}/>
    </div>
  </div>

  );
}

export default RightSide;
