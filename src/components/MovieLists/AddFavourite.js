import React, { useEffect, useState } from "react";
import Heart from "react-heart";

const AddFavourite = (props) => {
  const [fav, setFav] = useState(false);

  const movie = props.movie;
  const index = props.index;

  const handleClick = (movie) => {
    const favMovies = JSON.parse(window.localStorage.getItem("fav-movies"));
    window.localStorage.setItem("fav-movies", { ...favMovies, movie });
  };

  const styleHeart01 = {
    width: "2.5rem",
  };

  const styleHeart02 = {
    width: "2.5rem",
  };

  useEffect(() => {
    const favMovies = JSON.parse(window.localStorage.getItem("fav-movies"));

    if (favMovies) {
      favMovies.some((favMovie) => {
        if (favMovie.id === movie.id) {
          // console.log("true");
          setFav(true);
        }
      });
    }
  }, [movie, window.localStorage.getItem("fav-movies")]);

  // console.log(movie)


  return (
    <>
      <Heart
        className={
          `my-fav-list-heart ${index}` === "true"
            ? styleHeart01
            : styleHeart02
        }
        isActive={fav}
        style={styleHeart01}
        onClick={() => handleClick({movie, index})}
      />
    </>
  );
};

export default AddFavourite;
