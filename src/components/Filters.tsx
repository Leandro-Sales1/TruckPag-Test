import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useFilms } from "../context/FilmsContext";
import { FaHeart, FaRegEye, FaRegHeart } from "react-icons/fa";



const Filters = () => {
  const [textFilter, setTextFilter] = useState('');
  const { filterFilmsByText, orderFilmsByOption, filterByWacthed, filterByFavorited } = useFilms();
  const [isOpen, setIsOpen] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [selected, setSelected] = useState("Default");

  useEffect(() => {
    if (selected === "Default") {
      setTextFilter("")
    }
  }, [selected]);

  const options = [
    "Default", "Title A-Z", "Title Z-A", "Duration (Longest)",
    "Duration (Shortest)", "Score (Highest)", "Score (Lowest)"
  ];

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    orderFilmsByOption(option);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setTextFilter(text);
    filterFilmsByText(text);
  }

  const toggleWatched = () => {
    const updatedState = !isWatched;
    setIsWatched(updatedState);
    filterByWacthed(updatedState);
  }

  const toggleFavorited = () => {
    const updatedState = !isFavorited;
    setIsFavorited(updatedState);
    filterByFavorited(updatedState);
  }

  return (
    <section>
      <div className="flex flex-col mt-5  flex-wrap justify-start md:flex-row md:items-center md:justify-around">
        <div className="flex items-center relative mt-6">
          <BsSearch className="absolute left-3 text-gray-400" />
          <input
            className="border-2 rounded-3xl p-1 pl-8 w-80"
            value={textFilter}
            onChange={handleChange}
            type="text"
            id="TextFilter"
            maxLength={30}
            placeholder="Search movies..."
          />
        </div>

        <div className="relative inline-block text-left mt-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-black text-white px-4 py-2 rounded-lg w-48 text-left shadow-md"
          >
            {selected}
            <span className="float-right">▾</span>
          </button>

          {isOpen && (
            <ul className="absolute z-10 mt-1 w-48 bg-gray-800 text-white rounded-lg shadow-lg border border-gray-700">
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex items-center mt-6 gap-4 md:ml-16 lg:ml-48">
        <p>Filters:</p>
        {isWatched ?
          <button className="flex gap-2 items-center w-max p-2 rounded-2xl cursor-pointer bg-gray-800 text-white transition-colors hover:bg-gray-700 hover:text-white"
            onClick={() => toggleWatched()}>
            <FaRegEye />
            <label className="text-sm cursor-pointer">Watched</label>
          </button>
          :
          <button className="flex gap-2 items-center w-max p-2 rounded-2xl cursor-pointer bg-gray-200 text-black transition-colors hover:bg-gray-300"
            onClick={() => toggleWatched()}>
            <FaRegEye />
            <label className="text-sm cursor-pointer">Watched</label>
          </button>}
        {isFavorited ?
          <button className="flex gap-2 items-center w-max p-2 rounded-2xl cursor-pointer bg-red-800 text-white transition-colors hover:bg-red-700 hover:text-white"
            onClick={() => toggleFavorited()}>
            <FaHeart />
            <label className="text-sm cursor-pointer">Favorited</label>
          </button>
          :
          <button className="flex gap-2 items-center w-max p-2 rounded-2xl cursor-pointer bg-gray-200 text-black transition-colors hover:bg-gray-300"
            onClick={() => toggleFavorited()}>
            <FaRegHeart />
            <label className="text-sm cursor-pointer">Favorited</label>
          </button>}
      </div>
    </section>
  )
}

export default Filters;