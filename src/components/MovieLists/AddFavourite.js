import React, { useEffect, useState } from "react";
import Heart from "react-heart";

const AddFavourite = (props) => {

  const [activeHeart, setActiveHeart] = useState(false);

  const movie= props.movie
  const index= props.index


  const handleClick = ({movie, index}) => {

    setActiveHeart(!activeHeart)
    // saveToLocalStorege(favMovies);
    window.localStorage.setItem(`my-fav-list-heart : ${index}`, JSON.stringify(activeHeart));
  }

const styleHeart01 = {
  width: "2.5rem",
};

const styleHeart02 = {
  width: "4.5rem",
};


useEffect(() => {
  window.localStorage.setItem(`my-fav-list-heart : ${index}`, JSON.stringify(activeHeart))
  // console.log(`my-fav-list-heart : ${index}`, activeHeart)
}, [activeHeart]);

// useEffect(() => {
//   const items = JSON.parse(window.localStorage.getItem(`my-fav-list-heart : ${index}`));
//   if (items) {
//     setActiveHeart(items)
//   }
//   console.log(items)
// }, []);

  return(
    <>
    <Heart
              // className= {`my-fav-list-heart : ${index}` === 'true' ? 'bg-salmon' : 'bg-salmon-01'}
              isActive={activeHeart}
              style={styleHeart01}
              // onClick={() => props.handleFavouritesClick(movie)}
              onClick= {() => handleClick({movie, index})}
            />
    </>
  )
}

export default AddFavourite;