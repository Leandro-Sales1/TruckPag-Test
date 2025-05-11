import { FaStar } from "react-icons/fa";
import type { IFilm } from "../interfaces/IFilm";
import { runningTimeCalculator } from "../utils/runningTimeCalculator";
import DescriptionText from "./DescriptionText";


const Cards = ({ films }: { films: IFilm[] }) => {
  return (
    <section className="my-6 mx-auto flex flex-wrap gap-8">
      {
        films.map((film) => {
          return (
            <div className="shadow-lg bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-1 rounded-2xl flex flex-col w-72 max-h-max" key={film.id}>
              <img className="w-72 h-auto rounded-t-2xl" src={film.image} alt={film.title} />
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
              </div>
            </div>
          )
        })
      }
    </section>
  )
}

export default Cards;