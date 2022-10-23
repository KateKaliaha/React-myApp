import { act, cleanup, render, screen } from '@testing-library/react';
import { ModalWindow } from 'component/ModalWindow/ModalWindow';
import { ICardApi } from 'data/interfaces';
import React from 'react';
import { PathToNotFoundImage } from '../ModalCard';

const card = {
  adult: true,
  backdrop_path: null,
  genre_ids: [18, 80],
  id: 1021735,
  original_language: 'ky',
  original_title: 'Продаётся дом',
  overview: ' ',
  popularity: 13.025,
  poster_path: '/iSnRfGxEeX9O2rTHcWn38qR5D1F.jpg',
  release_date: '2022-10-10',
  title: 'Продаётся дом',
  video: false,
  vote_average: 0,
  vote_count: 0,
};

const card1 = {
  adult: false,
  backdrop_path: null,
  genre_ids: [18, 80],
  id: 1021735,
  original_language: 'ky',
  original_title: 'Продаётся дом',
  overview: ' ',
  popularity: 13.025,
  poster_path: null,
  release_date: '2022-10-10',
  title: 'Продаётся дом',
  video: false,
  vote_average: 0,
  vote_count: 0,
};
const closeModalWindow = jest.fn();

describe('ModalWindow', () => {
  afterEach(cleanup);

  it('render with adult === true and poster_path !== null', async () => {
    await act(async () => {
      await render(<ModalWindow movie={card as ICardApi} closeModalWindow={closeModalWindow} />);
    });

    expect(screen.queryByText(/c 18 лет/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500/iSnRfGxEeX9O2rTHcWn38qR5D1F.jpg'
    );
  });

  it('render with adult === false and poster_path === null', async () => {
    await act(async () => {
      await render(<ModalWindow movie={card1 as ICardApi} closeModalWindow={closeModalWindow} />);
    });

    expect(screen.queryByText(/c 5 лет/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', `${PathToNotFoundImage}`);
  });
});
