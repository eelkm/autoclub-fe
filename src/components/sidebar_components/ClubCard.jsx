import styles from './ClubCard.module.css';

const ClubCard = ({clubname, image}) => {
  return (
    <div>
      <div className={styles.card}>
        <img className={styles.img} src={image} alt="" />
        <p>{clubname}</p>
      </div>
    </div>
  );
}

export default ClubCard;
