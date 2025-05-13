import { FaHeart, FaRegEye, FaRegHeart, FaStar } from "react-icons/fa";
import { runningTimeCalculator } from "../utils/runningTimeCalculator";
import DescriptionText from "./DescriptionText";
import { useFilms } from "../context/FilmsContext";
import { toast } from "react-toastify";


const Cards = () => {

  const { filteredFilms, films, setFilms } = useFilms();

  const toggleWatched = (filmID: string) => {
    const updateFilms = films.map((film) =>
      film.id === filmID
        ? { ...film, watched: film.watched === undefined ? true : !film.watched }
        : film
    );
    setFilms(updateFilms);

    const updatedFilm = updateFilms.find((film) => film.id === filmID);
    if (!updatedFilm) return;

    if (updatedFilm.watched) {
      toast.success(`${updatedFilm.title} added to watched!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });
    } else {
      toast.error(`${updatedFilm.title} removed from watched!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });
    }
  }

  const toggleFavorited = (filmID: string) => {
    const updateFilms = films.map((film) =>
      film.id === filmID
        ? { ...film, favorited: film.favorited === undefined ? true : !film.favorited }
        : film
    );
    setFilms(updateFilms);
    const updatedFilm = updateFilms.find((film) => film.id === filmID);
    if (!updatedFilm) return;

    if (updatedFilm.favorited) {
      toast.success(`${updatedFilm.title} added to favorited!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });
    } else {
      toast.error(`${updatedFilm.title} removed from favorited!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });
    }
  }

  return (
    <section className="my-6 mx-auto flex flex-wrap gap-8">
      {
        filteredFilms.length > 0 ?
          filteredFilms.map((film) => {
            return (
              <div className="shadow-lg bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-1 rounded-2xl flex flex-col w-72 max-h-max" key={film.id}>
                <div>
                  <img className="w-72 h-auto rounded-t-2xl " src={film.image} alt={film.title} loading="lazy" />
                  <div className="flex items-center justify-center p-4 transition-opacity duration-200 bg-black">
                    <p className="text-white text-center font-medium">{film.original_title_romanised}</p>
                  </div>
                </div>
                <div className="rounded-b-2xl bg-white p-4 flex flex-col gap-2">
                  <h2 className="text-md font-bold">{film.title}</h2>
                  <p className="text-sm text-gray-500">{`${film.release_date} • ${runningTimeCalculator(film.running_time)}`}</p>
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      <FaStar className="text-md text-yellow-400" />
                      <p className="text-sm">{`${film.rt_score}%`}</p>
                    </div>
                  </div>
                  <DescriptionText text={film.description} />
                  <p className="text-sm text-gray-500">{`Director: ${film.director}`}</p>
                  <p className="text-sm text-gray-500">{`Producer: ${film.producer}`}</p>
                  <div className="mt-8 ml-2 flex flex-col items-start gap-2">
                    {film.watched ?
                      <button className="flex gap-2 items-center w-max p-2 rounded-2xl cursor-pointer bg-gray-800 text-white transition-colors hover:bg-gray-700 hover:text-white"
                        onClick={() => toggleWatched(film.id)}>
                        <FaRegEye />
                        <label className="text-sm cursor-pointer">Watched</label>
                      </button>
                      :
                      <button className="flex gap-2 items-center w-max p-2 rounded-2xl cursor-pointer bg-gray-200 text-black transition-colors hover:bg-gray-300"
                        onClick={() => toggleWatched(film.id)}>
                        <FaRegEye />
                        <label className="text-sm cursor-pointer">Mark Watched</label>
                      </button>}

                    {film.favorited ?
                      <button className="flex gap-2 items-center w-max p-2 rounded-2xl cursor-pointer bg-red-800 text-white transition-colors hover:bg-red-700 hover:text-white"
                        onClick={() => toggleFavorited(film.id)}>
                        <FaHeart />
                        <label className="text-sm cursor-pointer">Favorited</label>
                      </button>
                      :
                      <button className="flex gap-2 items-center w-max p-2 rounded-2xl cursor-pointer bg-gray-200 text-black transition-colors hover:bg-gray-300"
                        onClick={() => toggleFavorited(film.id)}>
                        <FaRegHeart />
                        <label className="text-sm cursor-pointer">Add Favorite</label>
                      </button>}
                  </div>
                </div>
              </div>
            )
          })
          :
          <h2>No movies found!</h2>
      }
    </section>
  )
}

export default Cards;