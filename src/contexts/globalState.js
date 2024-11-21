import React, { createContext, useContext, useState } from 'react';


const GlobalStateContext = createContext();


export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

export const GlobalStateProvider = ({ children }) => {
  const [isNavBarOpen, setIsNavBarOpen] = useState(true); 

  const trocaEstado = () => {
    setIsNavBarOpen(prevState => !prevState);
  };

  return (
    <GlobalStateContext.Provider value={{ isNavBarOpen, trocaEstado }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
