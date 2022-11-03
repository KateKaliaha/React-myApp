import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from 'App';
import { Provider } from 'react-redux';
import store from 'store';

describe('Router', () => {
  it('render headers links in app', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    const linkMain = screen.getByText(/Главная/i);
    expect(linkMain).toBeInTheDocument();
    const linkAbout = screen.getByText(/О нас/i);
    expect(linkAbout).toBeInTheDocument();
  });

  it('change render pages by links', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    const linkMain = screen.getByText(/Главная/i);

    const linkAbout = screen.getByText(/О нас/i);
    userEvent.click(linkAbout);
    expect(screen.getByText(/Добро пожаловать/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/Поиск.../i)).not.toBeInTheDocument();

    userEvent.click(linkMain);
    expect(screen.queryByText(/Добро пожаловать/i)).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Поиск.../i)).toBeInTheDocument();
  });

  it('error page', () => {
    render(
      <MemoryRouter initialEntries={['/fff']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
