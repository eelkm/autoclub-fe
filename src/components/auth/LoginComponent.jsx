import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { BackendURL } from "../../utils/Constants";
import styles from "./Auth.module.css";

const LoginComponent = ({ setToken, setShowLogin }) => {
  const navigate = useNavigate(); // Used to redirect the user
  const { setCurrentUser } = useGlobalContext(); // Used to set the username in state

  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [password, setPassword] = useState("");

  const [isWrongCredentials, setIsWrongCredentials] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BackendURL}/login`, {
        username,
        password,
      });

      const authToken = response.data.token;
      setToken(authToken);

      // Store the token in local storage
      localStorage.setItem("token", authToken);

      // Redirect to a new URL with the username as a parameter
      setCurrentUser(username);
      navigate(`/profile/${username}`);
    } catch (error) {
      if (error.response.status === 401) {
        setIsWrongCredentials(true);
      }
    }
  };

  return (
    <div className={styles.session}>
      <div className={styles.left}>
        <video
          src="../../assets/Snapinsta.app_video_5246C153C4C0D9D47E1726CF85E6BE93_video_dashinit.webm"
          type="video/webm"
        ></video>
      </div>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        autoComplete="off"
      >
        <h4 className={styles.h4}>AutoClub</h4>
        <p>Welcome back! Log in to your account.</p>
        {isWrongCredentials ? (
          <div className={styles.invalid}>
            Username or password is incorrect
          </div>
        ) : null}

        <div className={styles.floating_label}>
          <input
            className={styles.input}
            placeholder="Username"
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            value={username ? username : ""}
            onChange={(e) => {
              setUsername(e.target.value);
              setIsWrongCredentials(false);
            }}
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
            onChange={(e) => {
              setPassword(e.target.value);
              setIsWrongCredentials(false);
            }}
          />
          <label className={styles.label} htmlFor="password">
            Password
          </label>
        </div>

        <div className={styles.btns}>
          <button
            className={styles.altbutton}
            type="button"
            onClick={() => setShowLogin(false)}
          >
            Sign up
          </button>
          <button className={styles.button} type="submit" onClick={handleLogin}>
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
