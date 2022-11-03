import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { CardList } from '../CardList';
import { renderWithProviders } from '../../../utils/test-utils';
import { fakeMoviesArray } from 'pages/MainPage/MainPage.test';

describe('CardList', () => {
  afterEach(cleanup);

  it('snapshot CardList container', async () => {
    const initialState = {
      movies: fakeMoviesArray,
      data: {
        results: fakeMoviesArray,
        totalResults: 600,
      },
      loading: false,
    };

    const { container } = renderWithProviders(
      <BrowserRouter>
        <CardList />
      </BrowserRouter>,

      {
        preloadedState: {
          movie: initialState,
        },
      }
    );

    expect(container).toMatchSnapshot();
  });
  it('click on card', async () => {
    const initialState = {
      movies: fakeMoviesArray,
      data: {
        results: fakeMoviesArray,
        totalResults: 600,
      },
      loading: false,
    };

    renderWithProviders(
      <BrowserRouter>
        <CardList />
      </BrowserRouter>,
      {
        preloadedState: {
          movie: initialState,
        },
      }
    );
    const card = screen.queryAllByTestId('card');
    await act(async () => await userEvent.click(card[0]));
  });
});
