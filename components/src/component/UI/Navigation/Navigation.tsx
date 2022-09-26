import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="nav-container">
      <NavLink to={'/'}>Main</NavLink>
      <NavLink to={'/about'}>About us</NavLink>
    </nav>
  );
}

export { Navigation };
