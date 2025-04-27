import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="material-icons">sports_esports</span>
        <h1>WORDCHAIN GAME</h1>
      </div>
      <div className="nav-links">
        <NavLink to="/game" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          GAME
        </NavLink>

        <NavLink to="/rules" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          RULES
        </NavLink>

        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          GAME INFO
        </NavLink>
        
      </div>
    </nav>
  );
};

export default Navbar;
