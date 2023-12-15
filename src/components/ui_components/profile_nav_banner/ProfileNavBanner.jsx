import styles from "./ProfileNavBanner.module.css";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { NavConstants } from "../../../utils/constants";

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
        <a onClick={() => handleNavClick(NavConstants.Profile)} className={`${styles.profile_menu_link} ${profileNav == NavConstants.Profile && styles.active}`}>Profile</a>
        <a onClick={() => handleNavClick(NavConstants.Garage)} className={`${styles.profile_menu_link} ${profileNav == NavConstants.Garage && styles.active}`}>Garage</a>
        <a onClick={() => handleNavClick(NavConstants.Friends)} className={`${styles.profile_menu_link} ${profileNav == NavConstants.Friends && styles.active}`}>Friends</a>
        {currentUser === userData.username && <a onClick={() => handleNavClick(NavConstants.EditProfile)} className={`${styles.profile_menu_link} ${profileNav == NavConstants.EditProfile && styles.active}`}>Edit profile</a>}
      </div>
    </div>
  );
}

export default ProfileNavBanner;
