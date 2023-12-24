import React, { useState, useEffect } from "react";
import axios from "axios";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import Homepage from "./components/Homepage";
import { useGlobalContext } from "./contexts/GlobalContext";

function App() {
  const { token, setToken } = useGlobalContext();

  // Check for token in localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div>
      {token ? (
        <div>
          <Homepage token={token} />
        </div>
      ) : (
        <div>
          <RegisterComponent />
          <LoginComponent setToken={setToken} />
        </div>
      )}
    </div>
  );
}

export default App;
