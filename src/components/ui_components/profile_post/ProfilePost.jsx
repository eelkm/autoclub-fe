import styles from "./ProfilePost.module.css";

const ProfilePost = ({userData}) => {
  return (
    <div className={`${styles.post} ${styles.box}`}>
    <div className={styles.status_main}>
      <img
        src={userData.p_image_link}
        className={styles.status_img}
      />
      <div className={styles.post_detail}>
        <strong>{userData.username}</strong> added new post
        <div className={styles.post_date}>6 hours ago</div>
      </div>
      <button className={styles.intro_menu} />
    </div>
    <div className={styles.post_content}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente nobis adipisci ea amet at repellat impedit illum cupiditate accusantium? Praesentium!
    <img
      src="https://www.aiktuning.com/cdn/shop/products/57_71dcdb7a-cc6d-4c7c-9b11-4c751fda1717_1024x1024.jpg?v=1607519391"
      alt=""
      className={styles.post_photo}
    />
    </div>
    <div className={styles.post_actions}>
      <a href="#" className={styles.post_action}>
        <svg
          stroke="currentColor"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
        87
      </a>
      <a href="#" className={styles.post_action}>
        <svg
          stroke="currentColor"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="css-i6dzq1"
          viewBox="0 0 24 24"
        >
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
        20
      </a>
    </div>
  </div>
  );
}

export default ProfilePost;
