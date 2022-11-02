import React from 'react';
import { Navigation } from 'component/UI/Navigation/Navigation';
import './Header.css';
import { useAppSelector } from 'hook';

export function Header(): JSX.Element {
  const display = useAppSelector((state) => state.mainPage.display);

  return (
    <header className="header" style={{ display: `${display}` }}>
      <Navigation />
    </header>
  );
}
