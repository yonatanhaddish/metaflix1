import React, { useEffect, useState } from "react";
import "./movielists.css";
import Heart from "react-heart";

const MovieLists = (props) => {

  const FavouriteComponent = props.favouriteComponent;

  const [activee, setActivee] = useState(false)
  const handleClickk = ({movie, index}) => {
    
    setActivee(!activee);
  };

  

  return (
    <div className="container">
      {props.movies.map((movie, index) => (
        <div className="cards">
          <div className="card-img">
            <img
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              alt="movie"
              key={index}
              className="single-image"
            />
          </div>
          <div className="card-body" onClick={() => handleClickk({movie, index})}>
            <p className={activee ? 'bg-class' : 'bg-bg-class'}>
              {movie.title}</p>
          </div>
          <div className="card-heart"
              onClick={() => props.handleFavouritesClick(movie)}>
          
            <FavouriteComponent movie={movie} index={index} activee={activee}/>
            
          </div>
          
          
        </div>
        
      ))}
    </div>
  );
};

export default MovieLists;