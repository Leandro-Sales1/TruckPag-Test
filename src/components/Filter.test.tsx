import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "./Filters";
import { useFilms } from "../context/FilmsContext";

jest.mock("../context/FilmsContext", () => ({
  useFilms: jest.fn(),
}));

describe("Filters component", () => {
  const filterFilmsByText = jest.fn();
  const orderFilmsByOption = jest.fn();
  const filterByWacthed = jest.fn();
  const filterByFavorited = jest.fn();

  beforeEach(() => {
    (useFilms as jest.Mock).mockReturnValue({
      filterFilmsByText,
      orderFilmsByOption,
      filterByWacthed,
      filterByFavorited,
    });
  });

  it("renders search input and filter buttons", () => {
    render(<Filters />);
    expect(screen.getByPlaceholderText("Search movies...")).toBeInTheDocument();
    expect(screen.getByText("Filters:")).toBeInTheDocument();
    expect(screen.getByText("Watched")).toBeInTheDocument();
    expect(screen.getByText("Favorited")).toBeInTheDocument();
    expect(screen.getByText("Default")).toBeInTheDocument();
  });

  it("calls filterFilmsByText on input change", () => {
    render(<Filters />);
    const input = screen.getByPlaceholderText("Search movies...");

    fireEvent.change(input, { target: { value: "totoro" } });
    expect(filterFilmsByText).toHaveBeenCalledWith("totoro");
  });

  it("opens dropdown and selects an option", () => {
    render(<Filters />);
    const dropdownButton = screen.getByText("Default");
    fireEvent.click(dropdownButton);

    const option = screen.getByText("Title A-Z");
    fireEvent.click(option);

    expect(orderFilmsByOption).toHaveBeenCalledWith("Title A-Z");
  });

  it("toggles watched filter", () => {
    render(<Filters />);
    const watchedButton = screen.getByText("Watched");
    fireEvent.click(watchedButton);
    expect(filterByWacthed).toHaveBeenCalledWith(true);

    fireEvent.click(watchedButton);
    expect(filterByWacthed).toHaveBeenCalledWith(false);
  });

  it("toggles favorited filter", () => {
    render(<Filters />);
    const favoritedButton = screen.getByText("Favorited");
    fireEvent.click(favoritedButton);
    expect(filterByFavorited).toHaveBeenCalledWith(true);

    fireEvent.click(favoritedButton);
    expect(filterByFavorited).toHaveBeenCalledWith(false);
  });
});
