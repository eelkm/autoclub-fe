import styles from "./ProfileNavBanner.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { BackendURL, NavConstants } from "../../../utils/constants";

const ProfileNavBanner = ({ userData }) => {
  const { profileNav, setProfileNav } = useGlobalContext();
  const { currentUser } = useGlobalContext();
  const { token } = useGlobalContext();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleNavClick = (navLocation) => {
    // Updating the global context state when a navigation link is clicked
    setProfileNav(navLocation);
  };

  useEffect(() => {
    checkIfFollowing();
  }, [userData]);

  // Check if the current user is following the user whose profile is being viewed
  const checkIfFollowing = async () => {
    try {
      const response = await axios.get(
        `${BackendURL}/users/check_if_friends?friendId=${userData.id_user}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = response.data;

      if (data.success) {
        setIsFollowing(response.data.isFollowing);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  // Follow functionality
  const handleFollowClick = async () => {
    try {
      const response = await axios.post(
        `${BackendURL}/users/add_friend`,
        {
          friendId: userData.id_user,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = response.data;

      if (data.success) {
        setIsFollowing(true);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  // Unfollow functionality
  const handleUnfollowClick = async () => {
    try {
      const response = await axios.post(
        `${BackendURL}/users/remove_friend`,
        {
          friendId: userData.id_user,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = response.data;

      if (data.success) {
        setIsFollowing(false);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profile_avatar}>
        <img
          src={userData.p_image_link}
          alt="-"
          className={styles.profile_img}
        />
        <div className={styles.profile_name}>
          <div className={styles.username}>{userData.username}</div>
          <div>
            {currentUser !== userData.username && (
              <>
                {isFollowing ? (
                  <span
                    className={styles.following_btn}
                    onClick={handleUnfollowClick}
                  >
                    Following
                  </span>
                ) : (
                  <span
                    className={styles.follow_btn}
                    onClick={handleFollowClick}
                  >
                    Follow
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {userData.p_banner_link !== null && (
        <img
          src={userData.p_banner_link}
          alt=""
          className={styles.profile_cover}
        />
      )}
      <div className={styles.profile_menu}>
        <a
          onClick={() => handleNavClick(NavConstants.Profile)}
          className={`${styles.profile_menu_link} ${
            profileNav == NavConstants.Profile && styles.active
          }`}
        >
          Profile
        </a>
        <a
          onClick={() => handleNavClick(NavConstants.Garage)}
          className={`${styles.profile_menu_link} ${
            profileNav == NavConstants.Garage && styles.active
          }`}
        >
          Garage
        </a>
        <a
          onClick={() => handleNavClick(NavConstants.Friends)}
          className={`${styles.profile_menu_link} ${
            profileNav == NavConstants.Friends && styles.active
          }`}
        >
          Friends
        </a>
        {currentUser === userData.username && (
          <a
            onClick={() => handleNavClick(NavConstants.EditProfile)}
            className={`${styles.profile_menu_link} ${
              profileNav == NavConstants.EditProfile && styles.active
            }`}
          >
            Edit profile
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileNavBanner;
