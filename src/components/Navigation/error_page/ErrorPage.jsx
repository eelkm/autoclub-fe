import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={styles.error_page}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <h3>Or this feature is not completed</h3>
    </div>
  );
};

export default ErrorPage;
