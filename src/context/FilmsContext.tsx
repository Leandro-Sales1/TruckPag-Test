
import React, { createContext, useContext, useState } from 'react';
import type { IFilm } from '../interfaces/IFilm';

type FilmsContextType = {
  films: IFilm[];
  setFilms: React.Dispatch<React.SetStateAction<IFilm[]>>;
};

const FilmsContext = createContext<FilmsContextType | undefined>(undefined);

export const FilmsProvider = ({ children }: { children: React.ReactNode }) => {
  const [films, setFilms] = useState<IFilm[]>([]);

  return (
    <FilmsContext.Provider value={{ films, setFilms }}>
      {children}
    </FilmsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFilms = () => {
  const context = useContext(FilmsContext);
  if (!context) throw new Error('useFilms need to be used into a FilmsProvider');
  return context;
};
