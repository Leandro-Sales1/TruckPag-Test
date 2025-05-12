import { useEffect } from "react";
import { instance } from "./api/instance";
import Cards from "./components/Cards";
import { useFilms } from "./context/FilmsContext";
import { ToastContainer } from "react-toastify";

function App() {
  const { setFilms } = useFilms();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await instance.get("/films");
        setFilms(response.data);
      } catch (error) {
        alert(`Error on connecting the Studio Ghibli API, erro: ${error}`);
      }
    }
    getData();
  }, [setFilms]);


  return (
    <main className="mt-8 mx-auto max-w-7xl">
      <header className="mt-4  text-center">
        <h1 className="text-5xl font-bold">Studio Ghibli Collection</h1>
        <p className="mt-4">Explore the magical world of Studio Ghibli films. Mark your favorites and keep track of what you've watched.</p>
      </header>
      <Cards />
      <ToastContainer />
    </main>
  )
}

export default App;
