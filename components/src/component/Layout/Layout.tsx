import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'component/Header/Header';

function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
export { Layout };
