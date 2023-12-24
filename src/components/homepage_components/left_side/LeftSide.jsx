
import { Link } from 'react-router-dom';
import styles from './LeftSide.module.css';
import { useGlobalContext } from '../../../contexts/GlobalContext';
import { NavConstants } from '../../../utils/constants';

const LeftSide = () => {
  const { currentUser, setProfileNav} = useGlobalContext();

  return (
  <div className={styles.left_side}>
    <div className={styles.left_side_button}></div>
    <div className={styles.logo}>AutoClub</div>
    <div className={styles.side_wrapper}>
      <div className={styles.side_title}>MENU</div>
      <div className={styles.side_menu}>
        <Link to={`/profile/${currentUser}`} onClick={()=>setProfileNav(NavConstants.Profile)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <path d="M9 22V12h6v10" />
          </svg>
          Home
        </Link>
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          Explore
        </a>
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          Gallery
        </a>
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          Events
        </a>
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          Create club
        </a>
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
