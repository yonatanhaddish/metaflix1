import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import MovieLists from "./components/MovieLists/MovieLists";
import AddFavourite from "./components/MovieLists/AddFavourite";
import FavouriteList from "./components/MovieLists/FavouriteList";

function App() {
  const [movies, setMovies] = useState([]);
  const [favMovies, setFavMovies] = useState([]);
  const [active, setActive] = useState(false);

  // getting movie list from a third party API
  const getMovieRequest = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/popular?api_key=d0f5f2e135336200362af8a1a73acb17";

    const response = await fetch(url);
    const responseJson = await response.json();
    // console.log(responseJson);
    setMovies(responseJson.results);
  };

  useEffect(() => {
    getMovieRequest();
  }, []);

  // Check for a duplicated Favourite list and Add them
  const addFavouriteMovie = (movie) => {
    const newFavouriteLists = [...favMovies, movie];
    console.log(newFavouriteLists);
    console.log(movie.id);
    // console.log(favMovies)

    const newFavouriteList = Array.from(
      new Set(newFavouriteLists.map((el) => JSON.stringify(el)))
    ).map((el) => JSON.parse(el));

    setFavMovies(newFavouriteList);
    saveToLocalStorege(newFavouriteList);
    handleClick(newFavouriteList);
  };

  // toogle favourite icon
  const handleClick = (newFavouriteList) => {
    setActive(!active);
    // console.log(active)
    setActive(newFavouriteList);
    // console.log(newFavouriteList)
  };

  // removing favourite
  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favMovies.filter(
      (favMovie) => favMovie.id !== movie.id
    );
    setFavMovies(newFavouriteList);
    saveToLocalStorege(newFavouriteList);
  };

  // saving into LocalStorage
  const saveToLocalStorege = (items) => {
    localStorage.setItem("fav-movies", JSON.stringify(items));
  };

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem("fav-movies"));
    // console.log(movieFavourites);

    if (movieFavourites) {
      setFavMovies(movieFavourites);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <MovieLists
              movies={movies}
              favMovies={favMovies}
              handleFavouritesClick={addFavouriteMovie}
              favouriteComponent={AddFavourite}
              isActive={active}
            />
          }
        />
        <Route
          exact
          path="/liked"
          element={
            <FavouriteList
              movies={movies}
              favMovies={favMovies}
              handleFavouritesClick={removeFavouriteMovie}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
