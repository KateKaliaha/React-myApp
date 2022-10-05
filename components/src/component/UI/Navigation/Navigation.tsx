import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation(): JSX.Element {
  return (
    <nav className="nav-container">
      <NavLink to={'/'} end>
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

export { Navigation };
