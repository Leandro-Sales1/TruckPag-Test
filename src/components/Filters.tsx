import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useFilms } from "../context/FilmsContext";



const Filters = () => {
  const [textFilter, setTextFilter] = useState('');
  const { filterFilmsByText, oderFilmsByOption } = useFilms();
  const [isOpen, setIsOpen] = useState(false);
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
    oderFilmsByOption(option);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setTextFilter(text);
    filterFilmsByText(text);
  }

  return (
    <section>
      <div className="flex mt-6 justify-evenly">
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

        <div className="relative inline-block text-left mt-4">
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
    </section>
  )
}

export default Filters;