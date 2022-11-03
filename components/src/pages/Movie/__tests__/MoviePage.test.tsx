import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MoviePage } from '../MoviePage';
import { renderWithProviders } from '../../../utils/test-utils';
import { fakeMoviesArray } from 'pages/MainPage/MainPage.test';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '79580',
  }),
}));

describe('MoviePage', () => {
  afterEach(cleanup);
  it('render movie page', async () => {
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
        <MoviePage />
      </BrowserRouter>,
      {
        preloadedState: {
          movie: initialState,
          pageComponent: initialPage,
        },
      }
    );

    const link = screen.getByTestId('link-back');
    const imgPath = screen.getByRole('img');
    userEvent.click(link);
    expect(imgPath.getAttribute('src')).toContain('https://image.tmdb.org/t/p/w500');
  });
});
