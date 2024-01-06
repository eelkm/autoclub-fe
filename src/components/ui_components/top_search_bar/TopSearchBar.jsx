import styles from "./TopSearchBar.module.css";

const TopSearchBar = () => {
  return (
    <div className={styles.search_bar}>
      <input type="text" placeholder="Search" />
      <button className={styles.right_side_button}>Logout</button>
    </div>
  );
};

export default TopSearchBar;
