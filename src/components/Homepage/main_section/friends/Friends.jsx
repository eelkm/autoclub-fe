import styles from "./Friends.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../../../../contexts/GlobalContext";
import { BackendURL } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { NavConstants } from "../../../../utils/constants";
import UserCard from "../../../ui_components/user_card/UserCard";

const Friends = ({ userData }) => {
  const { token, setProfileNav } = useGlobalContext();
  const navigate = useNavigate();
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    getFriends({ type: "following" });
    getFriends({ type: "followers" });
  }, []);

  const getFriends = async ({ type }) => {
    try {
      const response = await axios.get(
        `${BackendURL}/users/get_friends?username=${userData.username}&type=${type}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = response.data;

      if (data.success) {
        if (type === "following") {
          setFollowing(data.friends);
        } else {
          setFollowers(data.friends);
        }
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const handleClick = (username) => {
    navigate(`/profile/${username}`);
    setProfileNav(NavConstants.Profile);
  };

  return (
    <div className={styles.box}>
      <div className={styles.following}>
        <h3>Following</h3>
        {following.map((friend) => {
          return (
            <div
              key={friend.username}
              className={styles.friend}
              onClick={() => handleClick(friend.username)}
            >
              <UserCard
                username={friend.username}
                image={friend.p_image_link}
              />
            </div>
          );
        })}

        {following.length == 0 && (
          <div className={styles.no_friends}>Not following anyone</div>
        )}
      </div>

      <div className={styles.followers}>
        <h3>Followers</h3>
        {followers.map((friend) => {
          return (
            <div
              key={friend.username}
              className={styles.friend}
              onClick={() => handleClick(friend.username)}
            >
              <UserCard
                username={friend.username}
                image={friend.p_image_link}
              />
            </div>
          );
        })}

        {followers.length == 0 && (
          <div className={styles.no_friends}>Not following anyone</div>
        )}
      </div>
    </div>
  );
};

export default Friends;
