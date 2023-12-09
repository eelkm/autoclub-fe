import styles from "./ProfileClubs.module.css";

const ProfileClubs = () => {
  return (
    <div className={`${styles.pages} ${styles.box}`}>
    <div className={styles.intro_title}>
      Your clubs
      <button className={styles.intro_menu} />
    </div>
    <div className={styles.user}>
      <img
        src="https://qph.cf2.quoracdn.net/main-qimg-c815116b769523ce3c69bb7dd6a87930"
        alt=""
        className={styles.user_img}
      />
      <div className={styles.username}>Item 1</div>
    </div>
    <div className={styles.user}>
      <img
        src="https://qph.cf2.quoracdn.net/main-qimg-c815116b769523ce3c69bb7dd6a87930"
        alt=""
        className={styles.user_img}
      />
      <div className={styles.username}>Item 2</div>
    </div>
    <div className={styles.user}>
      <img
        src="https://qph.cf2.quoracdn.net/main-qimg-c815116b769523ce3c69bb7dd6a87930"
        alt=""
        className={styles.user_img}
      />
      <div className={styles.username}>Item 3</div>
    </div>
  </div>
  );
}

export default ProfileClubs;
