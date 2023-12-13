import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileAbout from '../ui_components/profile_about/ProfileAbout';
import ProfileAddPost from '../ui_components/profile_add_post/ProfileAddPost';
import ProfileClubs from '../ui_components/profile_clubs/ProfileClubs';
import ProfileEvent from '../ui_components/profile_event/ProfileEvent';
import ProfileNavBanner from '../ui_components/profile_nav_banner/ProfileNavBanner';
import ProfilePost from '../ui_components/profile_post/ProfilePost';
import TopSearchBar from '../ui_components/top_search_bar/TopSearchBar';
import styles from './MainSection.module.css';
import { useGlobalContext } from '../../contexts/GlobalContext';
import Profile from './main_section_navbar_components/profile/Profile';
import Garage from './main_section_navbar_components/garage/Garage';
import Friends from './main_section_navbar_components/friends/Friends';
import EditProfile from './main_section_navbar_components/edit_profile/EditProfile';

const MainSection = ({ userData }) => {
  const { profileNav} = useGlobalContext();

  useEffect(() => {
    console.log(profileNav)
  }, [profileNav]);


  return (
    <div className={styles.main}>
      <TopSearchBar />
      <div className={styles.main_container}>
        <ProfileNavBanner userData={userData} />

        {profileNav == 'Profile' && <Profile userData={userData}/>}
        {profileNav == 'Garage' && <Garage />}
        {profileNav == 'Friends' && <Friends />}
        {profileNav == 'EditProfile' && <EditProfile />}

      </div>
    </div>
  );
};

export default MainSection;
