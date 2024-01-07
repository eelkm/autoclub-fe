import { useEffect, useState } from "react";
import styles from "./ProfileClubs.module.css";
import axios from "axios";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import ClubCard from "../club_card/ClubCard";
import { BackendURL } from "../../../utils/constants";

const ProfileClubs = ({ userData }) => {
  const { token } = useGlobalContext();
  const [memberOfClubs, setMemberOfClubs] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${BackendURL}/clubs/member_of_clubs?username=${userData.username}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        if (data.success) {
          setMemberOfClubs(data.memberOfClubs);
        } else {
          console.error("Error:", data.error);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch member clubs:", error);
      });
  }, [userData]); // Fetch member clubs when userData changes

  return (
    <div className={`${styles.pages} ${styles.box}`}>
      <div className={styles.intro_title}>Member of</div>

      {memberOfClubs.map((item, index) => (
        <div key={index} className={styles.user}>
          <img src={item.small_img_url} className={styles.user_img} />
          <div className={styles.contacts_username}>
            <div className={styles.club_name}>{item.name}</div>
            <div className={styles.role_name}>{item.role_name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileClubs;
