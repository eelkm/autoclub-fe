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
            border: "5px solid rgba(100,63,131,0.2) ",
          }}
        >
          <div
            style={{ boxShadow: "0px 0px 1000px 46px rgba(100,63,131,0.7)" }}
          >
            {showLogin ? (
              <LoginComponent setToken={setToken} setShowLogin={setShowLogin} />
            ) : (
              <RegisterComponent setShowLogin={setShowLogin} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
