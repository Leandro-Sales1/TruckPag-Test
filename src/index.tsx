import Cards from "./components/Cards";
import { ToastContainer } from "react-toastify";
import Filters from "./components/Filters";
import { useEffect } from "react";
import { instance } from "./api/instance";
import { useFilms } from "./context/FilmsContext";

function App() {

  const { setFilms, setFilteredFilms } = useFilms();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <main className="mt-8 px-4 mx-auto lg:max-w-7xl">
      <header className="mt-4  text-center">
        <h1 className="text-5xl font-bold">Studio Ghibli Collection</h1>
        <p className="mt-4">Explore the magical world of Studio Ghibli films. Mark your favorites and keep track of what you've watched.</p>
        <Filters />
      </header>
      <Cards />
      <ToastContainer />
    </main>
  )
}

export default App;
