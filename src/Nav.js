import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SetPosts } from "./action/userSlice";
// import "./index1.css";
const Nav = ({ search, setSearch, setIsUserLoggedIn, userData }) => {
  const dispatch = useDispatch();
  const handleAbout = () => {
    dispatch(
      SetPosts([
        {
          id: 1,
          title: "Mani G",
          date: "0054 29, 2023 3:54:14 PM",
          body: "my father",
        },
        {
          id: 2,
          title: "Cricket 2023",
          date: "0055 29, 2023 3:55:25 PM",
          body: "Cricket WC 2023 One Day World Cup",
        },
        {
          id: 3,
          title: "ssdd",
          date: "0034 30, 2023 3:34:09 PM",
          body: "ssdvFSAD",
        },
      ])
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item bg-light">
                <Link to="/" className="text-dark m-5">
                  Home
                </Link>
              </li>
              <li className="nav-item bg-light ">
                <Link to="/post" className="text-dark m-5">
                  Post
                </Link>
              </li>
              <li className="nav-item bg-light ">
                <Link
                  onClick={() => handleAbout()}
                  to="/about"
                  className="text-dark m-5"
                >
                  About
                </Link>
              </li>
              <li className="nav-item login ">
                <span
                  style={{ color: "black", fontSize: "25px" }}
                  className="m-2 loginname"
                >
                  {Object.keys(userData).length > 0
                    ? userData.name[0].toUpperCase()
                    : ""}
                </span>
                <button onClick={() => setIsUserLoggedIn(false)}>logout</button>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control searchbox"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
