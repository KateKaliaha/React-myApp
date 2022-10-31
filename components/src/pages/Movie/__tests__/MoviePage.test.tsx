import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataContext from 'context/DataContext';
import { state, dispatch } from 'pages/MainPage/MainPage.test';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MoviePage } from '../MoviePage';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '79580',
  }),
}));

describe('MoviePage', () => {
  afterEach(() => {
    cleanup();
  });
  it('render movie page', async () => {
    await act(async () => {
      await render(
        <BrowserRouter>
          <DataContext.Provider value={{ state, dispatch }}>
            <MoviePage />
          </DataContext.Provider>
        </BrowserRouter>
      );
    });

    const link = screen.getByTestId('link-back');
    const imgPath = screen.getByRole('img');
    userEvent.click(link);
    expect(dispatch).toBeCalled();
    expect(imgPath.getAttribute('src')).toContain('https://image.tmdb.org/t/p/w500');
  });
});
