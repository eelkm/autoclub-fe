import React from "react";
import styles from "./UserCard.module.css";
import DefaultPicture from "../default_picture/DefaultPicture";

const UserCard = ({ username, image }) => {
  return (
    <div className={styles.user}>
      {image == null ? (
        <div className={styles.user_img}>
          <DefaultPicture username={username} />
        </div>
      ) : (
        <img src={image} className={styles.user_img} />
      )}

      <div className={styles.contacts_username}>
        <div className={styles.club_name}>{username}</div>
      </div>
    </div>
  );
};

export default UserCard;
