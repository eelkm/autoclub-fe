import ProfileAbout from '../ui_components/profile_about/ProfileAbout';
import ProfileAddPost from '../ui_components/profile_add_post/ProfileAddPost';
import ProfileClubs from '../ui_components/profile_clubs/ProfileClubs';
import ProfileEvent from '../ui_components/profile_event/ProfileEvent';
import ProfileNavBanner from '../ui_components/profile_nav_banner/ProfileNavBanner';
import ProfilePost from '../ui_components/profile_post/ProfilePost';
import TopSearchBar from '../ui_components/top_search_bar/TopSearchBar';
import styles from './MainSection.module.css';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { useEffect } from 'react';

const MainSection = ({userData}) => {
  const { currentUser } = useGlobalContext();


  return (
<div className={styles.main}>
  <TopSearchBar />
  <div className={styles.main_container}>
    <ProfileNavBanner userData={userData}/>
    
    <div className={styles.timeline}>
      <div className={styles.timeline_left}>
        <ProfileAbout userData={userData}/>
        {currentUser === userData.username && <ProfileEvent />}
        {currentUser !== userData.username && <ProfileClubs />}
      </div>

      <div className={styles.timeline_right}>
        <ProfileAddPost userData={userData}/>
        <ProfilePost userData={userData}/>
      </div>
      
    </div>
  </div>
</div>

  );
}

export default MainSection;
