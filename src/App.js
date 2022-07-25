import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import './App.css';
import MovieLists from './components/MovieLists/MovieLists';
import AddFavourite from './components/MovieLists/AddFavourite';
import FavouriteList from './components/MovieLists/FavouriteList';

function App() {

  const [movies, setMovies] = useState([]);
  const [favMovies, setFavMovies] = useState([]);
  const [active, setActive] = useState(false);

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

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favMovies, movie];
    console.log(newFavouriteList);
    
    setFavMovies(newFavouriteList);
    saveToLocalStorege(newFavouriteList);
    handleClick(newFavouriteList);
  };

  const handleClick = (newFavouriteList) => {
    setActive(!active)
    console.log(active)
    setActive(newFavouriteList)
    console.log(newFavouriteList)
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favMovies.filter(
      (favMovie) => favMovie.id !== movie.id
    );
    setFavMovies(newFavouriteList);
    saveToLocalStorege(newFavouriteList);
  };

  const saveToLocalStorege = (items) => {
    localStorage.setItem("fav-movies", JSON.stringify(items));
  };

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem("fav-movies"));
    console.log(movieFavourites)

    if (movieFavourites) {
      setFavMovies(movieFavourites);
    }
  }, []);


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<MovieLists movies={movies} favMovies={favMovies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourite} isActive={active} />} />
        <Route exact path="/liked" element={<FavouriteList movies={movies} favMovies={favMovies}  handleFavouritesClick={removeFavouriteMovie} />} />
      </Routes>
    </Router>
   
  );
  
  
}

export default App;
