import React from 'react';
import { Navigation } from 'component/UI/Navigation/Navigation';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <Navigation />
    </header>
  );
}

export { Header };
