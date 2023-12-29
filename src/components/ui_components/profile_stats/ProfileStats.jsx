import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ProfileStats.module.css";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { BackendURL } from "../../../utils/constants";

const ProfileStats = ({ userData }) => {
  const { token } = useGlobalContext();

  const [stats, setStats] = useState();

  useEffect(() => {
    fetchStats();
  }, [userData, token]);

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        `${BackendURL}/users/get_stats?user_id=${userData.id_user}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        setStats(data.stats);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch user stats:", error);
    }
  };

  return (
    <>
      {stats ? (
        <div className={`${styles.intro} ${styles.box}`}>
          <div className={styles.center}>
            <div className={styles.intro_title}>{stats.profile_post_count}</div>
            <div>Posts</div>
          </div>

          <div className={styles.center}>
            <div className={styles.intro_title}>{stats.car_count}</div>
            <div>Cars</div>
          </div>
        </div>
      ) : (
        <div className={`${styles.intro} ${styles.box}`}>
          <div className={styles.center}>
            <div className={styles.intro_title}>?</div>
            <div>Posts</div>
          </div>

          <div className={styles.center}>
            <div className={styles.intro_title}>?</div>
            <div>Cars</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileStats;
