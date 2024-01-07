import LogoutBtn from "../logout_btn/LogoutBtn";
import styles from "./TopSearchBar.module.css";

const TopSearchBar = () => {
  return (
    <div className={styles.search_bar}>
      <input type="text" placeholder="Search" />
      <div className={styles.right_side_button}>
        <LogoutBtn />
      </div>
    </div>
  );
};

export default TopSearchBar;
