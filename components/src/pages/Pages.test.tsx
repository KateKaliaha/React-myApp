import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from 'App';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from 'utils/test-utils';
import { fakeMoviesArray } from './MainPage/MainPage.test';

describe('App', () => {
  afterEach(cleanup);
  it('snapshot home page', () => {
    const initialState = {
      movies: fakeMoviesArray,
      data: {
        results: fakeMoviesArray,
        totalResults: 600,
      },
      loading: false,
    };
    const initialPage = {
      page: 1,
      totalPages: 30,
      totalResults: 600,
      countMovieOnPage: 20,
    };

    const { container } = renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      {
        preloadedState: {
          movie: initialState,
          pageComponent: initialPage,
        },
      }
    );

    expect(container).toMatchSnapshot();
  });

  it('render main page', () => {
    const initialState = {
      movies: fakeMoviesArray,
      data: {
        results: fakeMoviesArray,
        totalResults: 600,
      },
      loading: false,
    };
    const initialPage = {
      page: 1,
      totalPages: 30,
      totalResults: 600,
      countMovieOnPage: 20,
    };

    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      {
        preloadedState: {
          movie: initialState,
          pageComponent: initialPage,
        },
      }
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
    const initialState = {
      movies: fakeMoviesArray,
      data: {
        results: fakeMoviesArray,
        totalResults: 600,
      },
      loading: false,
    };
    const initialPage = {
      page: 1,
      totalPages: 30,
      totalResults: 600,
      countMovieOnPage: 20,
    };

    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      {
        preloadedState: {
          movie: initialState,
          pageComponent: initialPage,
        },
      }
    );

    const linkForm = screen.getByText(/Отзыв/i);
    expect(linkForm).toBeInTheDocument();
    userEvent.click(linkForm);
    const formPage = screen.getByTestId('form-page');
    expect(formPage).toBeInTheDocument();
    expect(screen.queryByText(/Страница не найдена/i)).not.toBeInTheDocument();
  });
});
