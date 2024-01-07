import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import styles from "./MobileLeftSide.module.css";
import { FiHome } from "react-icons/fi";
import { ImCompass2 } from "react-icons/im";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaRegImage,
  FaRegPlusSquare,
} from "react-icons/fa";
import { MdEvent } from "react-icons/md";

const MobileLeftSide = () => {
  const { currentUser, setProfileNav, openMobileRight, setOpenMobileRight } =
    useGlobalContext();

  return (
    <div className={styles.nav}>
      <div className={styles.side_menu}>
        <Link
          to={`/profile/${currentUser}`}
          onClick={() => setProfileNav(NavConstants.Profile)}
        >
          <FiHome />
        </Link>

        <a href="#">
          <ImCompass2 />
        </a>

        <a href="#">
          <FaRegImage />
        </a>

        <a href="#">
          <MdEvent />
        </a>

        <a href="#">
          <FaRegPlusSquare />
        </a>

        <a>
          {openMobileRight ? (
            <FaChevronRight onClick={() => setOpenMobileRight(false)} />
          ) : (
            <FaChevronLeft onClick={() => setOpenMobileRight(true)} />
          )}
        </a>
      </div>
    </div>
  );
};

export default MobileLeftSide;
