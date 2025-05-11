import { useEffect, useState } from "react";
import { instance } from "./api/instance";
import type { IFilm } from "./interfaces/IFilm";
import Cards from "./components/Cards";


function App() {
  const [data, setData] = useState<IFilm[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await instance.get("/films");
        setData(response.data);
      } catch (error) {
        alert(`Error on connecting the Studio Ghibli API, erro: ${error}`);
      }
    }
    getData();
  }, []);

  return (
    <main className="mt-8 mx-auto max-w-7xl">
      <header className="mt-4  text-center">
        <h1 className="text-5xl font-bold">Studio Ghibli Collection</h1>
        <p className="mt-4">Explore the magical world of Studio Ghibli films. Mark your favorites and keep track of what you've watched.</p>
      </header>
      <Cards films={data} />
    </main>
  )
}

export default App;
