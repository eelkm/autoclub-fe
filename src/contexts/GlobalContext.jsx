import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [currentUserImg, setCurrentUserImg] = useState('');

  return (
    <GlobalContext.Provider value={{
      token, setToken,
      currentUser, setCurrentUser,
      currentUserImg, setCurrentUserImg,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);