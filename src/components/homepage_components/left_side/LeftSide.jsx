import { Link } from "react-router-dom";
import styles from "./LeftSide.module.css";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { NavConstants } from "../../../utils/constants";
import { FiHome } from "react-icons/fi";
import { ImCompass2 } from "react-icons/im";
import { FaRegImage, FaRegPlusSquare } from "react-icons/fa";
import { MdEvent } from "react-icons/md";

const LeftSide = () => {
  const { currentUser, setProfileNav } = useGlobalContext();

  return (
    <div className={styles.left_side}>
      <div className={styles.logo}>AutoClub</div>
      <div className={styles.image_container}>
        <img
          className={styles.logo_image}
          src="/src/assets/Logo 500.png"
          alt=""
        />
      </div>
      <div className={styles.side_wrapper}>
        <div className={styles.side_title}>MENU</div>
        <div className={styles.side_menu}>
          <Link
            to={`/profile/${currentUser}`}
            onClick={() => setProfileNav(NavConstants.Profile)}
          >
            <FiHome />
            <span>Home</span>
          </Link>
          <a href="#">
            <ImCompass2 />
            <span>Explore</span>
          </a>
          <a href="#">
            <FaRegImage />
            <span>Gallery</span>
          </a>
          <a href="#">
            <MdEvent />
            <span>Events</span>
          </a>
          <a href="#">
            <FaRegPlusSquare />
            <span>Create club</span>
          </a>
        </div>
      </div>
      {/* <div className={styles.side_wrapper}>
        <div className={styles.side_title}>MENU</div>
        <div className={styles.side_menu}>
          <a href="#">ITEM</a>
          <a href="#">ITEM</a>
          <a href="#">ITEM</a>
          <a href="#">ITEM</a>
          <a href="#">ITEM</a>
          <a href="#">ITEM</a>
        </div>
      </div> */}
    </div>
  );
};

export default LeftSide;
