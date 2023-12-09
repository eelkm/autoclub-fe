import styles from '../../homepage_components/RightSide.module.css';

const ClubCard = ({clubname, image}) => {
  return (
      <div className={styles.user}>
        <img
          src={image}
          className={styles.user_img}
        />
        <div className={styles.contacts_username}>
          {clubname}
        </div>
      </div>
  );
}

export default ClubCard;
