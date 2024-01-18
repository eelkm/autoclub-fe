import { useState } from "react";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import styles from "./LogoutBtn.module.css";
import { NavConstants } from "../../../utils/Constants";
import DefaultPicture from "../default_picture/DefaultPicture";

const LogoutBtn = () => {
  const Navigate = useNavigate();
  // For Logout button animation
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const { setToken, currentUser, currentUserImg, setProfileNav } =
    useGlobalContext();

  const handleMouseClick = () => {
    setIsLogoutHovered(true);
  };

  const handleMouseLeave = () => {
    setIsLogoutHovered(false);
  };

  const handleLogout = () => {
    // Remove the token from both state and localStorage
    setToken("");
    setProfileNav(NavConstants.Profile);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    Navigate(`/`);
  };

  return (
    <span
      className={styles.account_user}
      onClick={handleMouseClick}
      onMouseLeave={handleMouseLeave}
    >
      {isLogoutHovered ? (
        <div onClick={handleLogout} className={styles.logout}>
          Logout
        </div>
      ) : (
        <div className={styles.username}>{currentUser}</div>
      )}

      {currentUserImg === null ? (
        <div className={styles.account_profile}>
          <DefaultPicture username={currentUser} />
        </div>
      ) : (
        <img src={currentUserImg} alt="" className={styles.account_profile} />
      )}

      <span>▶</span>
    </span>
  );
};

export default LogoutBtn;
