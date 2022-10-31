import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from 'App';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  afterEach(cleanup);

  it('snapshot home page', () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('render main page', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const linkMain = screen.getByText(/Главная/i);
    expect(linkMain).toBeInTheDocument();
    expect(screen.queryByText(/Страница не найдена/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
    userEvent.click(linkMain);
    expect(screen.queryByRole('searchbox')).toBeInTheDocument();
    expect(screen.queryByText(/Перейти на главную страницу/i)).not.toBeInTheDocument();
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
