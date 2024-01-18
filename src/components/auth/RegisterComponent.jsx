import React, { useState } from "react";
import axios from "axios";
import { BackendURL } from "../../utils/Constants";
import styles from "./Auth.module.css";

const RegisterComponent = ({ setShowLogin }) => {
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const handleSetUsername = (e) => {
    setUsername(e.target.value);
    setIsUsernameTaken(false);

    const isValid = /^[a-zA-Z0-9_.]*$/.test(e.target.value);

    if (isValid) {
      // Your string is valid
      setIsUsernameValid(true);
    } else {
      // Your string is invalid
      setIsUsernameValid(false);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${BackendURL}/register`, {
        username,
        password,
      });
      console.log(response);
      console.log("Registration successful");
      if (response.status === 200) {
        localStorage.setItem("username", username);
        setShowLogin(true);
      }
    } catch (error) {
      console.error("Registration failed");
      console.log(error);
      if (error.response.status === 400) {
        setError(error.response.data.error);
        setIsUsernameTaken(true);
        console.log(error.response.data.error);
      }
    }
  };

  return (
    <div className={styles.session}>
      <div className={styles.left}></div>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        autoComplete="off"
      >
        <h4 className={styles.h4}>Sign up!</h4>
        <p>New here? Sign up and create new account.</p>
        {isUsernameValid ? null : (
          <div className={styles.invalid}>
            Valid special characters are: Underscore _ and Dot .
          </div>
        )}
        {isUsernameTaken ? <div className={styles.invalid}>{error}</div> : null}
        <div className={styles.floating_label}>
          <input
            className={styles.input}
            placeholder="Username"
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            spellCheck="false"
            value={username}
            onChange={(e) => handleSetUsername(e)}
          />
          <label className={styles.label} htmlFor="username">
            Username
          </label>
        </div>

        <div className={styles.floating_label}>
          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className={styles.label} htmlFor="password">
            Password
          </label>
        </div>

        <div className={styles.btns}>
          <button
            className={styles.altbutton}
            type="button"
            onClick={() => setShowLogin(true)}
          >
            Log in
          </button>
          <button
            className={styles.button}
            type="submit"
            onClick={() => handleRegister}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterComponent;
