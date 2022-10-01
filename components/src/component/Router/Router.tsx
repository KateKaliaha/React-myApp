import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from 'pages/MainPage/MainPage';
import { AboutPage } from 'pages/AboutPage/AboutPage';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import { Layout } from 'component/Layout/Layout';

function RouterInApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export { RouterInApp };
