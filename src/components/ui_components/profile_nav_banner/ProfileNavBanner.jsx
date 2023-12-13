import styles from "./ProfileNavBanner.module.css";
import { useGlobalContext } from "../../../contexts/GlobalContext";

const ProfileNavBanner = ({userData}) => {
  const { profileNav, setProfileNav } = useGlobalContext();
  const { currentUser } = useGlobalContext();

  const handleNavClick = (navLocation) => {
    // Updating the global context state when a navigation link is clicked
    setProfileNav(navLocation);
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profile_avatar}>
        <img src={userData.p_image_link} alt="" className={styles.profile_img}/>
        <div className={styles.profile_name}>{userData.username}</div>
      </div>
      <img
        src={userData.p_banner_link}
        alt=""
        className={styles.profile_cover}
      />
      <div className={styles.profile_menu}>
        <a onClick={() => handleNavClick("Profile")} className={`${styles.profile_menu_link} ${profileNav == 'Profile' && styles.active}`}>Profile</a>
        <a onClick={() => handleNavClick("Garage")} className={`${styles.profile_menu_link} ${profileNav == 'Garage' && styles.active}`}>Garage</a>
        <a onClick={() => handleNavClick("Friends")} className={`${styles.profile_menu_link} ${profileNav == 'Friends' && styles.active}`}>Friends</a>
        {currentUser === userData.username && <a onClick={() => handleNavClick("EditProfile")} className={`${styles.profile_menu_link} ${profileNav == 'EditProfile' && styles.active}`}>Edit profile</a>}
      </div>
    </div>
  );
}

export default ProfileNavBanner;
