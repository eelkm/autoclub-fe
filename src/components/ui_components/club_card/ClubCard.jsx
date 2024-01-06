import styles from "./ClubCard.module.css";

const ClubCard = ({ clubname, image, role_name }) => {
  const truncatedClubName =
    clubname.length > 10 ? `${clubname.slice(0, 10)}..` : clubname;

  return (
    <div className={styles.user}>
      <img src={image} className={styles.user_img} />
      <div className={styles.contacts_username}>
        <div className={styles.club_name}>{truncatedClubName}</div>
        <div className={styles.role_name}>{role_name}</div>
      </div>
    </div>
  );
};

export default ClubCard;
