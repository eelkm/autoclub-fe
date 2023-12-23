import React, { useEffect, useState } from 'react';
import ProfileNavBanner from '../ui_components/profile_nav_banner/ProfileNavBanner';
import TopSearchBar from '../ui_components/top_search_bar/TopSearchBar';
import styles from './MainSection.module.css';
import { useGlobalContext } from '../../contexts/GlobalContext';
import Profile from './main_section_navbar_components/profile/Profile';
import Garage from './main_section_navbar_components/garage/Garage';
import Friends from './main_section_navbar_components/friends/Friends';
import EditProfile from './main_section_navbar_components/edit_profile/EditProfile';

const MainSection = ({ userData }) => {
  const { profileNav} = useGlobalContext();

  return (
    <div className={styles.main}>
      <TopSearchBar />
      <div className={styles.main_container}>
        <ProfileNavBanner userData={userData} />

        {profileNav == 'Profile' && <Profile userData={userData}/>}
        {profileNav == 'Garage' && <Garage userData={userData}/>}
        {profileNav == 'Friends' && <Friends userData={userData} />}
        {profileNav == 'EditProfile' && <EditProfile userData={userData}/>}

      </div>

      
    </div>
  );
};

export default MainSection;
