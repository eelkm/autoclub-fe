import React, { useState } from "react";
import axios from "axios";
import { BackendURL } from "../utils/constants";

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post(`${BackendURL}/register`, { username, password });
      console.log("Registration successful");
    } catch (error) {
      console.error("Registration failed");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default RegisterComponent;
