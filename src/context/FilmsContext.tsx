
import React, { createContext, useContext, useState } from 'react';
import type { IFilm } from '../interfaces/IFilm';


type FilmsContextType = {
  films: IFilm[];
  setFilms: React.Dispatch<React.SetStateAction<IFilm[]>>;
  filteredFilms: IFilm[];
  filterFilmsByText: (text: string) => void;
  setFilteredFilms: React.Dispatch<React.SetStateAction<IFilm[]>>;
  orderFilmsByOption: (text: string) => void;
  filterByWacthed: (isWatched: boolean) => void;
  filterByFavorited: (isFavorited: boolean) => void;
};

const FilmsContext = createContext<FilmsContextType | undefined>(undefined);

export const FilmsProvider = ({ children }: { children: React.ReactNode }) => {
  const [films, setFilms] = useState<IFilm[]>([]);
  const [filteredFilms, setFilteredFilms] = useState<IFilm[]>([]);

  const filterFilmsByText = (text: string) => {
    if (!text.trim()) {
      setFilteredFilms(films);
    } else {
      const filtered = films.filter((film) =>
        film.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredFilms(filtered);
    }
  };

  const orderFilmsByOption = (text: string) => {
    switch (text) {
      case "Default":
        setFilteredFilms(films);
        break;

      case "Title A-Z": {
        const sortedAZ = [...filteredFilms].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setFilteredFilms(sortedAZ);
        break;
      }

      case "Title Z-A": {
        const sortedZA = [...filteredFilms].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        setFilteredFilms(sortedZA);
        break;
      }

      case "Duration (Longest)": {
        const sortedLong = [...filteredFilms].sort(
          (a, b) => Number(b.running_time) - Number(a.running_time)
        );
        setFilteredFilms(sortedLong);
        break;
      }

      case "Duration (Shortest)": {
        const sortedLong = [...filteredFilms].sort(
          (a, b) => Number(a.running_time) - Number(b.running_time)
        );
        setFilteredFilms(sortedLong);
        break;
      }

      case "Score (Highest)": {
        const sortedLong = [...filteredFilms].sort(
          (a, b) => Number(b.rt_score) - Number(a.rt_score)
        );
        setFilteredFilms(sortedLong);
        break;
      }

      case "Score (Lowest)": {
        const sortedLong = [...filteredFilms].sort(
          (a, b) => Number(a.rt_score) - Number(b.rt_score)
        );
        setFilteredFilms(sortedLong);
        break;
      }

      default:
        break;
    }
  };

  const filterByWacthed = (isWatched: boolean) => {
    if (!isWatched) {
      setFilteredFilms(films);
    } else {
      const filtered = [...filteredFilms].filter((film) => film.watched === true);
      setFilteredFilms(filtered);
    }
  }

  const filterByFavorited = (isFavorited: boolean) => {
    if (!isFavorited) {
      setFilteredFilms(films);
    } else {
      const filtered = [...filteredFilms].filter((film) => film.favorited === true);
      setFilteredFilms(filtered);
    }
  }

  return (
    <FilmsContext.Provider value={{
      films, setFilms, filteredFilms, filterFilmsByText,
      setFilteredFilms, orderFilmsByOption, filterByWacthed, filterByFavorited
    }}>
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
