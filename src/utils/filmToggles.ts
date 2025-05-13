import type { IFilm } from "../interfaces/IFilm";

export const updateWatchedStatus = (filmsArray: IFilm[], filmID: string): IFilm[] => {
  return filmsArray.map((film) =>
    film.id === filmID
      ? { ...film, watched: film.watched === undefined ? true : !film.watched }
      : film
  );
};

export const updateFavoritedStatus = (filmsArray: IFilm[], filmID: string): IFilm[] => {
  return filmsArray.map((film) =>
    film.id === filmID
      ? { ...film, favorited: film.favorited === undefined ? true : !film.favorited }
      : film
  );
};