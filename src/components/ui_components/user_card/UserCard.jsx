import React from "react";
import styles from "./UserCard.module.css";

const UserCard = ({ clubname, image, role_name }) => {
  return (
    <div className={styles.user}>
      <img src={image} className={styles.user_img} />
      <div className={styles.contacts_username}>
        <div className={styles.club_name}>{clubname}</div>
        <div className={styles.role_name}>{role_name}</div>
      </div>
    </div>
  );
};

export default UserCard;
