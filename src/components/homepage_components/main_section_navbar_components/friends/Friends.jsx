import styles from "./Friends.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../../../../contexts/GlobalContext";
import { BackendURL } from "../../../../utils/constants";
import ClubCard from "../../../ui_components/club_card/ClubCard";
import { useNavigate } from "react-router-dom";
import { NavConstants } from "../../../../utils/constants";

const Friends = ({ userData }) => {
  const { token, setProfileNav } = useGlobalContext();
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    getFriends();
  }, []);

  const getFriends = async () => {
    try {
      const response = await axios.get(
        `${BackendURL}/users/get_friends?username=${userData.username}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = response.data;

      if (data.success) {
        setFriends(data.friends);
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
      {friends.map((friend) => {
        return (
          <div
            key={friend.username}
            className={styles.friend}
            onClick={() => handleClick(friend.username)}
          >
            <ClubCard clubname={friend.username} image={friend.p_image_link} />
          </div>
        );
      })}

      {friends.length == 0 && (
        <div className={styles.no_friends}>No friends yet</div>
      )}
    </div>
  );
};

export default Friends;
