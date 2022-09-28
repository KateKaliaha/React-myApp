import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from 'App';

describe('App', () => {
  it('render start page', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const linkMain = screen.getByText(/Главная/i);
    expect(linkMain).toBeInTheDocument;
    const linkAbout = screen.getByText(/О нас/i);
    expect(linkAbout).toBeInTheDocument();
    expect(screen.getByText(/Дитя тьмы:/i)).toBeInTheDocument;
    expect(screen.queryByText(/404/i)).not.toBeInTheDocument;
    expect(screen.queryByText(/Добро пожаловать/i)).not.toBeInTheDocument;
  });
});
