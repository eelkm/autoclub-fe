import ProfileAbout from "../../../ui_components/profile_about/ProfileAbout";
import ProfileAddPost from "../../../ui_components/profile_add_post/ProfileAddPost";
import ProfileClubs from "../../../ui_components/profile_clubs/ProfileClubs";
import ProfileEvent from "../../../ui_components/profile_event/ProfileEvent";
import ProfilePost from "../../../ui_components/profile_post/ProfilePost";
import styles from "./Profile.module.css";
import { useGlobalContext } from "../../../../contexts/GlobalContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { BackendURL } from "../../../../utils/constants";
import ProfileStats from "../../../ui_components/profile_stats/ProfileStats";

const Profile = ({ userData }) => {
  const { currentUser } = useGlobalContext();
  const { token } = useGlobalContext();

  const [posts, setPosts] = useState([]);
  const [startPost, setStartPost] = useState(0);
  const [endPost, setEndPost] = useState(10);

  const handleShowMore = () => {
    setStartPost(0);
    setEndPost(endPost + 10);
  };

  useEffect(() => {
    axios
      .get(
        `${BackendURL}/post_user/user_posts?username=${userData.username}&startPost=${startPost}&endPost=${endPost}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        if (data.success) {
          setPosts(data.posts);
        } else {
          console.error("Error:", data.error);
        }
        // console.log('DATA:', data);
      })
      .catch((error) => {
        console.error("Failed to fetch user posts:", error);
      });
  }, [userData, startPost, endPost, token]);

  return (
    <div className={styles.timeline}>
      <div className={styles.timeline_left}>
        <ProfileStats userData={userData} />
        <ProfileAbout userData={userData} />
        {currentUser === userData.username && <ProfileEvent />}
        {currentUser !== userData.username && (
          <ProfileClubs userData={userData} />
        )}
      </div>

      <div className={styles.timeline_right}>
        {currentUser === userData.username && (
          <ProfileAddPost userData={userData} />
        )}

        {posts.map((item, index) => (
          <ProfilePost
            key={index}
            username={userData.username}
            p_image={userData.p_image_link}
            post={item}
          />
        ))}

        {posts.length === 0 ? (
          <div className={styles.no_posts}>No posts to show</div>
        ) : (
          <div className={styles.load_more} onClick={handleShowMore}>
            Show more
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
