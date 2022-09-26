import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { ErrorPage } from 'pages/ErrorPage';
import { Layout } from 'component/Layout/Layout';

function App() {
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

export default App;
