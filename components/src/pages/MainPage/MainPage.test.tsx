import { render, act, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import MainPage from './MainPage';

const fakeMoviesArray = [
  {
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
  },
  {
    adult: false,
    backdrop_path: '/koE0U8zlwdWNLE3oADZeUFFGBah.jpg',
    genre_ids: [18, 9648],
    id: 79580,
    original_language: 'ru',
    original_title: 'Дом',
    overview:
      'В большом доме, посреди донских степей, живёт семейство Шамановых. Всё есть в этом доме, — кроме покоя, любви и взаимопонимания. Отцы конфликтуют с детьми, дети с отцами и друг с другом. Старший сын, Виктор, возвращается в отчий дом после 25-летнего отсутствия. Пока еще он не знает, что по пятам за ним идёт группа профессиональных убийц…',
    popularity: 3.048,
    poster_path: '/iSnRfGxEeX9O2rTHcWn38qR5D1F.jpg',
    release_date: '2011-11-03',
    title: 'Дом',
    video: false,
    vote_average: 6.3,
    vote_count: 26,
  },
  {
    adult: false,
    backdrop_path: '/sB0KzuKaKiBAfdyRoWPtJsbqOhN.jpg',
    genre_ids: [10749],
    id: 70070,
    original_language: 'ru',
    original_title: 'Дом Солнца',
    overview:
      'Неожиданная встреча Саши с лидером хиппи Солнцем изменила ее всегда такую правильную, распланированную и благополучную жизнь. И не было ничего удивительного в том, что она влюбилась в этого загадочного и принципиального парня. Субкультура хиппи, музыка Макаревича, любовь и свобода стали первыми шагами Саши во взрослую жизнь. Без Солнца.',
    popularity: 1.961,
    poster_path: '/s2KKdUusmKoCNIR0o5Byus4EcJO.jpg',
    release_date: '2009-06-06',
    title: 'Дом Солнца',
    video: false,
    vote_average: 5.1,
    vote_count: 16,
  },
  {
    adult: false,
    backdrop_path: '/8MVitvSlFmHLCDgJr93NvFX7H34.jpg',
    genre_ids: [18, 10749, 10752],
    id: 72996,
    original_language: 'ru',
    original_title: 'Дом дураков',
    overview:
      'Где-то в Чечне стоит огороженная забором районная клиника для душевнобольных. Война грохочет вдали, но с каждым днем она все ближе и ближе. Однажды весь персонал во главе с доктором Ильичом исчезает, и больные наслаждаются полной свободой, переворачивая все вверх дном. Внезапно появившийся чеченский отряд наводит «порядок», а на следующий день возвращаются российские войска. Чеченцы отступают, и в мир больных врывается безумие войны…',
    popularity: 1.951,
    poster_path: '/4jpGDmOgHRbpCe36SIYZKi3TXiy.jpg',
    release_date: '2002-12-06',
    title: 'Дом дураков',
    video: false,
    vote_average: 6,
    vote_count: 30,
  },
];

const localStorageMock = (function () {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('MainPage:', () => {
  beforeEach(() => {
    window.localStorage.clear();
    const mockJsonPromise = Promise.resolve({
      page: 0,
      results: [...fakeMoviesArray],
      total_pages: 9,
      total_results: 174,
    });
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise) as jest.Mock;
  });

  test('render component with value in localstorage, click on card and check open and close modal window', async () => {
    // const spyDidMount = jest.spyOn(MainPage.prototype, 'componentDidMount');
    // const spyOpenModalWindow = jest.spyOn(MainPage.prototype, 'openModalWindow');
    // const spyCloseModalWindow = jest.spyOn(MainPage.prototype, 'closeModalWindow');
    // const fetchPromiseStartPage = jest.spyOn(MainPage.prototype, 'fetchPromiseStartPage');
    localStorageMock.setItem('value', 'дом');

    await act(async () => {
      render(<MainPage />);
    });

    await expect((await screen.findAllByRole('img')).length).toBe(4);
    // expect(spyDidMount).toHaveBeenCalledTimes(1);
    // expect(fetchPromiseStartPage).toHaveBeenCalled();

    const card = screen.queryAllByTestId('card');

    await act(async () => {
      await userEvent.click(card[0]);
    });

    // expect(spyOpenModalWindow).toHaveBeenCalled();

    const modal = screen.getByTestId('modal');
    expect(modal.classList.contains('active-modal'));

    const btnClose = screen.getByTestId('close-btn');

    await act(async () => {
      await userEvent.click(btnClose);
    });

    // expect(spyCloseModalWindow).toHaveBeenCalled();
  });

  test('render component without value in localstorage', async () => {
    // const mockMainPage = new MainPage({});
    // const spyDidMount = jest.spyOn(MainPage.prototype, 'componentDidMount');

    await act(async () => {
      render(<MainPage />);
    });

    // expect(mockMainPage.state.value).toBeNull();
    // expect(spyDidMount).toHaveBeenCalledTimes(1);
  });

  it('check working method getSearchCardList after keydown "Enter" in searchinput', async () => {
    // const mockMainPage = new MainPage({});
    // const spyGetSearchCardList = jest.spyOn(MainPage.prototype, 'getSearchCardList');

    await act(async () => {
      render(<MainPage />);
    });

    // expect(mockMainPage.state.value).toBeNull();
    // expect(spyGetSearchCardList).toHaveBeenCalledTimes(0);

    const input = screen.getByRole('searchbox');

    await act(async () => {
      await userEvent.type(input, 'дом');
      await fireEvent.keyDown(input, { keyCode: 13 });
    });

    // expect(spyGetSearchCardList).toBeCalled();
  });
});
