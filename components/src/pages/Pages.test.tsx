import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from 'App';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  it('render start page', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const linkMain = screen.getByText(/Главная/i);
    expect(linkMain).toBeInTheDocument();
    const linkAbout = screen.getByText(/О нас/i);
    expect(linkAbout).toBeInTheDocument();
    expect(screen.getByText(/Дитя тьмы:/i)).toBeInTheDocument();
    expect(screen.queryByText(/Страница не найдена/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Добро пожаловать/i)).not.toBeInTheDocument();
  });

  it('render form page', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const linkForm = screen.getByText(/Отзыв/i);
    expect(linkForm).toBeInTheDocument();
    userEvent.click(linkForm);
    const formPage = screen.getByTestId('form-page');
    expect(formPage).toBeInTheDocument();
    expect(screen.queryByText(/Страница не найдена/i)).not.toBeInTheDocument();
  });
});
