import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'component/Header/Header';
import { DataProvider } from 'context/DataContext';

function Layout(): JSX.Element {
  return (
    <>
      <DataProvider>
        <Header />
        <main className="container">
          <Outlet />
        </main>
      </DataProvider>
    </>
  );
}
export { Layout };
