import { createContext, useContext, useState } from "react";

export const threadContext = createContext();

export const ThreadProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <threadContext.Provider value={{ currentUser, setCurrentUser,showMenu, setShowMenu }}>
      {children}
    </threadContext.Provider>
  );
};

export const useThreadContext = () => {
    return useContext(threadContext);
    }
