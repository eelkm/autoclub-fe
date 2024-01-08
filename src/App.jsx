import React, { useState, useEffect } from "react";
import axios from "axios";
import RegisterComponent from "./components/Auth/RegisterComponent";
import LoginComponent from "./components/Auth/LoginComponent";
import Homepage from "./components/Main";
import { useGlobalContext } from "./contexts/GlobalContext";

function App() {
  const { token, setToken } = useGlobalContext();
  const [showLogin, setShowLogin] = useState(true);

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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {showLogin ? (
            <LoginComponent setToken={setToken} setShowLogin={setShowLogin} />
          ) : (
            <RegisterComponent setShowLogin={setShowLogin} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
