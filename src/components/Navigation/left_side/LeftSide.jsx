import { Link } from "react-router-dom";
import styles from "./LeftSide.module.css";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { NavConstants } from "../../../utils/Constants";
import { FiHome } from "react-icons/fi";
import { ImCompass2 } from "react-icons/im";
import { FaRegImage, FaRegPlusSquare } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import UserCard from "../../ui_components/user_card/UserCard";

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

          <Link to={`/featured`}>
            <ImCompass2 />
            <span>Explore</span>
          </Link>

          <Link to={`/gallery`}>
            <FaRegImage />
            <span>Gallery</span>
          </Link>

          <Link to={`/events`}>
            <MdEvent />
            <span>Events</span>
          </Link>

          <Link to={`/new`}>
            <FaRegPlusSquare />
            <span>Create club</span>
          </Link>
        </div>
      </div>
      <div className={styles.side_wrapper_recomended}>
        <div className={styles.side_title}>Recomended</div>
        <div className={styles.side_menu}>
          <Link
            to={`/profile/edgars.apinis`}
            onClick={() => setProfileNav(NavConstants.Profile)}
          >
            <UserCard
              username={"edgars.apinis"}
              image={
                "https://autoclubbucket.s3.eu-north-1.amazonaws.com/a4aa1c17e7fa5823f1ef649caa9c8a1b"
              }
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
