import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './navbar.css';


const Navbar = () => {

    useEffect(() => {
        document.title = "MetaFlix"
    });

  return (
    <>
      <div className="nav-bar-container">
        <div className="nav-bar">
          <div className="nav-bar-logo">
            <h1 className="comp-name">MetaFlix</h1>
          </div>
          <div className="nav-menu">
            <div className="nav-item">
              {/* <a href="/">Home</a> */}
              <Link to="/">Home</Link>
            </div>
            <div className="nav-item">
              {/* <a href="/liked">Favourite</a> */}
              <Link to="/liked">Favourite</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;