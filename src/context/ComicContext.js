'use client';

import React, { createContext, useState, useContext } from 'react';
export const ComicContext = createContext([]);

export const ComicProvider = ({ children }) => {
  const [comics, setComics] = useState([]);

  return (
    <ComicContext.Provider value={{ comics, setComics }}>
      {children}
    </ComicContext.Provider>
  );
};

export function useComic() {
  return useContext(ComicContext);
}