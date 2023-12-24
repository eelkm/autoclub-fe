import styles from "./ProfileEvent.module.css";

const ProfileEvent = () => {
  return (
    <div className={`${styles.event} ${styles.box}`}>
      <div className={styles.event_wrapper}>
        <img
          src="https://www.latvia.travel/sites/default/files/styles/mobile_promo/public/media_image/50694300443_c304a08d14_k.jpg?itok=z14xPQ7g"
          className={styles.event_img}
        />
        <div className={styles.event_date}>
          <div className={styles.event_month}>Jan</div>
          <div className={styles.event_day}>01</div>
        </div>
        <div className={styles.event_title}>Car Meet Jelgava</div>
        <div className={styles.event_subtitle}>01st Jan, 2019 19:00</div>
      </div>
    </div>
  );
};

export default ProfileEvent;
