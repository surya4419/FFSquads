import React, { useContext, useState } from 'react';
import './navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from "../../context/Context.jsx";

const Navbar = ({ setShowLogin }) => {
  const [option, setOption] = useState("home");
  const { token, setToken } = useContext(Context);
  const navigate = useNavigate();

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Clear the token in context
    setToken(null);
    // Navigate to home or login page
    navigate('/');
  };

  return (
    <div className='nav-container'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid" id='navbar'>
          <Link to="/" className="navbar-brand">
            <img src="LOGO.png" alt="LOGO" />
          </Link>
          {!token ? (
            <button onClick={() => setShowLogin(true)}>Sign In</button>
          ) : (
            <div className='navbar-profile'>
              <img src="profile_icon.png" alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate("/profile")}>
                  <img src="profile_icon.png" alt="" />
                  <p>Profile</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src="logout_icon.png" alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => setOption("home")}
                  id={option === "home" ? "active" : ""}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a
                  href='#my-contest'
                  className="nav-link"
                  onClick={() => setOption("my-contest")}
                  id={option === "my-contest" ? "active" : ""}
                >
                  My Contests
                </a>
              </li>
              <li className="nav-item">
                <a
                  href='#all-contest'
                  onClick={() => setOption("all-contest")}
                  id={option === "all-contest" ? "active" : ""}
                  className="nav-link"
                >
                  All Contests
                </a>
              </li>
              {token && (
                <li className="nav-item">
                  <span
                    onClick={logout}
                    id={option === "logout" ? "active" : ""}
                    className="nav-link logout-link"
                    style={{ cursor: 'pointer' }}
                  >
                    Logout
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
