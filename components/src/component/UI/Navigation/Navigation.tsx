import React from 'react';
import { NavLink } from 'react-router-dom';

export function Navigation(): JSX.Element {
  return (
    <nav className="nav-container">
      <NavLink to={'/movie'} end>
        Главная
      </NavLink>
      <NavLink to={'/about'} end>
        О нас
      </NavLink>
      <NavLink to={'/form'} end>
        Отзыв
      </NavLink>
    </nav>
  );
}
