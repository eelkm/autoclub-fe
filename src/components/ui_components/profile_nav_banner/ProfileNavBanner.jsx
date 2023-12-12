import styles from "./ProfileNavBanner.module.css";

const ProfileNavBanner = ({userData}) => {
  return (
    <div className={styles.profile}>
      <div className={styles.profile_avatar}>
        <img
          src={userData.p_image_link}
          alt=""
          className={styles.profile_img}
        />
        <div className={styles.profile_name}>{userData.username}</div>
      </div>
      <img
        src={userData.p_banner_link}
        alt=""
        className={styles.profile_cover}
      />
      <div className={styles.profile_menu}>
        <a className={`${styles.profile_menu_link} ${styles.active}`}>Profile</a>
        <a className={styles.profile_menu_link}>Garage</a>
        <a className={styles.profile_menu_link}>Friends</a>
        <a className={styles.profile_menu_link}>Edit profile</a>
      </div>
    </div>
  );
}

export default ProfileNavBanner;
