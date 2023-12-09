
import styles from './LeftSide.module.css';

const LeftSide = () => {
  return (
  <div className={styles.left_side}>
    <div className={styles.left_side_button}></div>
    <div className={styles.logo}>AutoClub</div>
    <div className={styles.side_wrapper}>
      <div className={styles.side_title}>MENU</div>
      <div className={styles.side_menu}>
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <path d="M9 22V12h6v10" />
          </svg>
          Home
        </a>
        <a href="#">Home</a>
        <a href="#">Explore</a>
        <a href="#">Home</a>
        <a href="#">Home</a>
        <a href="#">Events</a>
      </div>
    </div>
    <div className={styles.side_wrapper}>
      <div className={styles.side_title}>MENU</div>
      <div className={styles.side_menu}>
        <a href="#">ITEM</a>
        <a href="#">ITEM</a>
        <a href="#">ITEM</a>
        <a href="#">ITEM</a>
        <a href="#">ITEM</a>
        <a href="#">ITEM</a>
      </div>
    </div>
  </div>
  );
}

export default LeftSide;
