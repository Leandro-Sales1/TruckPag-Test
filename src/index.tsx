import Cards from "./components/Cards";
import { ToastContainer } from "react-toastify";
import Filters from "./components/Filters";

function App() {
  return (
    <main className="mt-8 mx-auto max-w-7xl">
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
