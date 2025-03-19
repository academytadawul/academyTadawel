import { useContext, createContext, useState } from "react";

const GlobalContext = createContext();

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const GlobalProvider = ({ children }) => {
  const [filtered_tours, set_filtered_tours] = useState([]);
  const [tours, set_tours] = useState([]);
  return (
    <GlobalContext.Provider
      value={{ filtered_tours, set_filtered_tours, tours, set_tours }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, useGlobalContext };
