import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from 'App';

describe('Router', () => {
  it('render headers links in app', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const linkMain = screen.getByText(/Главная/i);
    expect(linkMain).toBeInTheDocument;
    const linkAbout = screen.getByText(/О нас/i);
    expect(linkAbout).toBeInTheDocument();
  });

  it('change render pages by links', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const linkMain = screen.getByText(/Главная/i);

    const linkAbout = screen.getByText(/О нас/i);
    userEvent.click(linkAbout);
    expect(screen.getByText(/Добро пожаловать/i)).toBeInTheDocument;
    expect(screen.findByPlaceholderText(/Поиск.../i)).not.toBeInTheDocument;

    userEvent.click(linkMain);
    expect(screen.findByText(/Добро пожаловать/i)).not.toBeInTheDocument;
    expect(screen.getByPlaceholderText(/Поиск.../i)).toBeInTheDocument;
  });

  it('error page', () => {
    render(
      <MemoryRouter initialEntries={['/fff']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument;
  });
});
