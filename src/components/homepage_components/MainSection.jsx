import ProfileAbout from '../ui_components/profile_about/ProfileAbout';
import ProfileAddPost from '../ui_components/profile_add_post/ProfileAddPost';
import ProfileClubs from '../ui_components/profile_clubs/ProfileClubs';
import ProfileEvent from '../ui_components/profile_event/ProfileEvent';
import ProfileNavBanner from '../ui_components/profile_nav_banner/ProfileNavBanner';
import ProfilePost from '../ui_components/profile_post/ProfilePost';
import TopSearchBar from '../ui_components/top_search_bar/TopSearchBar';
import styles from './MainSection.module.css';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MainSection = ({userData}) => {
  const { currentUser } = useGlobalContext();

  // 
  const { token } = useGlobalContext();
  const startPost = 0;
  const endPost = 10;
  const [posts, setPosts] = useState([]);
  // Getting posts for user

  useEffect(() => {
    axios.get(`http://localhost:5000/users/user_posts?username=${userData.username}&startPost=${startPost}&endPost=${endPost}`, {
      headers: {
        Authorization: token,
      },
    })
      .then(response => {
        const data = response.data;
        if (data.success) {
          setPosts(data.posts);
        } else {
          console.error('Error:', data.error);
        }
        console.log('DATA:', data);
      })
      .catch(error => {
        console.error('Failed to fetch user posts:', error);
      });
  }, [userData]);


  return (
<div className={styles.main}>
  <TopSearchBar />
  <div className={styles.main_container}>
    <ProfileNavBanner userData={userData}/>
    
    <div className={styles.timeline}>
      <div className={styles.timeline_left}>
        <ProfileAbout userData={userData}/>
        {currentUser === userData.username && <ProfileEvent />}
        {currentUser !== userData.username && <ProfileClubs userData={userData}/>}
      </div>

      <div className={styles.timeline_right}>
        {currentUser === userData.username && <ProfileAddPost userData={userData}/>}

        {posts.map((item, index) => (
        <ProfilePost key={index} username={userData.username} p_image={userData.p_image_link} post={item}/>
        ))}
        
      </div>
      
    </div>
  </div>
</div>

  );
}

export default MainSection;
