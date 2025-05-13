import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useFilms } from "../context/FilmsContext";



const Filters = () => {
  const [textFilter, setTextFilter] = useState('');
  const { filterFilms, films } = useFilms();

  useEffect(() => {
    setTextFilter('');
  }, [films])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setTextFilter(text);
    filterFilms(text);
  }

  return (
    <section>
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

    </section>
  )
}

export default Filters;