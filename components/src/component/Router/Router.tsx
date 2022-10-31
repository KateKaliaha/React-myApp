import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from 'pages/MainPage/MainPage';
import { AboutPage } from 'pages/AboutPage/AboutPage';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import { Layout } from 'component/Layout/Layout';
import { FormPage } from 'pages/FormPage/FormPage';
import { MoviePage } from 'pages/Movie/MoviePage';
import { HomePage } from 'pages/HomePage/HomePage';

export function RouterInApp(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />}></Route>
        <Route path="/movie" element={<MainPage />}></Route>
        <Route path="/movie/:id" element={<MoviePage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/form" element={<FormPage />}></Route>
        <Route path="/*" element={<ErrorPage />}></Route>
      </Route>
    </Routes>
  );
}
