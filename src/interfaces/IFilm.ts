export interface IFilm{
  description: string;
  director: string;
  id: string;
  image: string;
  movie_banner: string;
  original_title_romanised: string;
  producer: string;
  release_date: string;
  rt_score: string;
  running_time: string;
  title: string;
  url: string;
  watched?: boolean;
  favorited?: boolean;
}