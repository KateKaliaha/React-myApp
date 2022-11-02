import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'component/Header/Header';

export function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
