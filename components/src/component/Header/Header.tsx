import React, { useContext } from 'react';
import { Navigation } from 'component/UI/Navigation/Navigation';
import './Header.css';
import DataContext from 'context/DataContext';

export function Header(): JSX.Element {
  const { state } = useContext(DataContext);

  return (
    <header className="header" style={{ display: `${state.display}` }}>
      <Navigation />
    </header>
  );
}
