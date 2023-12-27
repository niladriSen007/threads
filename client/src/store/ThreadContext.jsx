import { createContext, useContext, useState } from "react";

export const threadContext = createContext();

export const ThreadProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("current-user"))
  );
  const [showMenu, setShowMenu] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [liked, setLiked] = useState([0]);
  return (
    <threadContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        showMenu,
        setShowMenu,
        updating,
        setUpdating,
        liked,
        setLiked,
      }}
    >
      {children}
    </threadContext.Provider>
  );
};

export const useThreadContext = () => {
  return useContext(threadContext);
};
