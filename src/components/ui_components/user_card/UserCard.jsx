import React from "react";
import styles from "./UserCard.module.css";

const UserCard = ({ username, image }) => {
  return (
    <div className={styles.user}>
      <img src={image} className={styles.user_img} />
      <div className={styles.contacts_username}>
        <div className={styles.club_name}>{username}</div>
      </div>
    </div>
  );
};

export default UserCard;
