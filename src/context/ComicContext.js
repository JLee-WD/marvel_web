import React, { createContext, useState, useContext } from 'react';

export const ComicContext = createContext(null);

export const ComicProvider = ({ children }) => {
  const [comics, setComics] = useState([]);

  return (
    <ComicContext.Provider value={{ comics, setComics }}>
      {children}
    </ComicContext.Provider>
  );
};