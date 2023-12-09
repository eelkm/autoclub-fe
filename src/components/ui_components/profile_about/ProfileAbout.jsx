import styles from "./ProfileAbout.module.css";

const ProfileAbout = ({userData}) => {
  return (
    <div className={`${styles.intro} ${styles.box}`}>
      <div className={styles.intro_title}>
        About
        <button className={styles.intro_menu} />
      </div>
      <div className={styles.info}>

        <div>{userData.desc_about}</div>

      </div>
    </div>
  );
}

export default ProfileAbout;
