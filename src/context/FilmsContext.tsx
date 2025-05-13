
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { IFilm } from '../interfaces/IFilm';
import { instance } from '../api/instance';

type FilmsContextType = {
  films: IFilm[];
  setFilms: React.Dispatch<React.SetStateAction<IFilm[]>>;
  filteredFilms: IFilm[];
  filterFilms: (text: string) => void;
};

const FilmsContext = createContext<FilmsContextType | undefined>(undefined);

export const FilmsProvider = ({ children }: { children: React.ReactNode }) => {
  const [films, setFilms] = useState<IFilm[]>([]);
  const [filteredFilms, setFilteredFilms] = useState<IFilm[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await instance.get("/films");
        setFilms(response.data);
        setFilteredFilms(response.data);
      } catch (error) {
        alert(`Error on connecting the Studio Ghibli API, erro: ${error}`);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    setFilteredFilms(films)
  }, [films])

  const filterFilms = (text: string) => {
    if (!text.trim()) {
      setFilteredFilms(films);
    } else {
      const filtered = films.filter((film) =>
        film.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredFilms(filtered);
    }
  };

  return (
    <FilmsContext.Provider value={{ films, setFilms, filteredFilms, filterFilms }}>
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
