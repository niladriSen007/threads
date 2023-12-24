import { createContext, useContext, useState } from "react";

export const threadContext = createContext();

export const ThreadProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <threadContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </threadContext.Provider>
  );
};

export const useThreadContext = () => {
    return useContext(threadContext);
    }
