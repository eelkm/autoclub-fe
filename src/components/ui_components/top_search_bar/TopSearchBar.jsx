import styles from "./TopSearchBar.module.css";

const TopSearchBar = () => {
  return (
    <div className={styles.search_bar}>
      <input type="text" placeholder="Search" />
      <button className={styles.right_side_button}>
        <svg
          viewBox="0 0 24 24"
          width={24}
          height={24}
          stroke="currentColor"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="css-i6dzq1"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </div>
  );
};

export default TopSearchBar;
