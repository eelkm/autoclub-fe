import { createContext, useContext, useState } from "react";
import { NavConstants } from "../utils/constants";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserImg, setCurrentUserImg] = useState("");
  const [profileNav, setProfileNav] = useState(NavConstants.Profile);
  const [updateComments, setUpdateComments] = useState();

  return (
    <GlobalContext.Provider
      value={{
        token,
        setToken,
        currentUser,
        setCurrentUser,
        currentUserImg,
        setCurrentUserImg,
        profileNav,
        setProfileNav,
        updateComments,
        setUpdateComments,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
