import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export function HomePage(): JSX.Element {
  return (
    <div className="home-page">
      <p>Добро пожаловать на наш сайт!</p>
      <Link to={'/movie'}>Перейти на главную страницу</Link>
    </div>
  );
}
