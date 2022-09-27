import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="nav-container">
      <NavLink to={'/'}>Главная</NavLink>
      <NavLink to={'/about'}>О нас</NavLink>
    </nav>
  );
}

export { Navigation };
