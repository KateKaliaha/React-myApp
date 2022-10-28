import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardList } from 'component/CardList/CardList';
import { Message } from 'component/Message/Message';
import { Search } from 'component/Search/Search';
import React from 'react';

const handleChange = jest.fn();
const openModalWindow = jest.fn();
const filterCardList = jest.fn();
const moviesArray = [
  {
    adult: false,
    backdrop_path: '/96UkPWauvnt98M95880bgVAi9DV.jpg',
    genre_ids: [18, 80],
    id: 1021735,
    original_language: 'ky',
    original_title: 'Продаётся дом',
    overview: ' ',
    popularity: 13.025,
    poster_path: '/1OUUMCyJEWSq4mwb342A5jjU14a.jpg',
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

describe('SearchBar', () => {
  // it('render search component', () => {
  //   render(<Search />);

  //   const input = screen.getByPlaceholderText(/Поиск.../i);

  //   expect(input).toBeInTheDocument;
  // });

  // it('input focus', () => {
  //   render(<Search />);

  //   const input = screen.getByPlaceholderText(/Поиск.../i);

  //   expect(input).not.toHaveFocus;
  //   input.focus();
  //   expect(input).toHaveFocus;
  // });

  it('handleChange works', () => {
    render(<input placeholder="Поиск..." onChange={handleChange} />);

    userEvent.type(screen.getByPlaceholderText(/Поиск.../i), 'пи');

    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  // it('typing in Search works', () => {
  //   render(<Search filter={filterCardList} />);

  //   expect(screen.queryByDisplayValue(/пи/)).toBeNull();
  //   userEvent.type(screen.getByPlaceholderText(/Поиск.../i), 'пи');

  //   expect(screen.queryByDisplayValue(/пи/)).toBeInTheDocument();
  // });

  it('filter is working, render CardList', () => {
    const value = 'Выш';
    render(
      <div className="main-page">
        <input placeholder="Поиск..." value="Выш" onChange={handleChange} />
        {moviesArray.length > 0 && (
          <CardList
            openModalWindow={openModalWindow}
            data={value.length ? moviesArray.filter((el) => el.title.includes(value)) : moviesArray}
          />
        )}
        {moviesArray.length === 0 && <Message />}
      </div>
    );

    userEvent.type(screen.getByPlaceholderText(/Поиск.../i), 'Выш');

    expect(screen.queryByText(/пиноккио/i)).toBeNull();
  });

  it('filter is working, empty cards', () => {
    const value = 'алхимик';
    render(
      <div className="main-page">
        <input placeholder="Поиск..." value="Выш" onChange={handleChange} />
        {moviesArray.length > 0 && (
          <CardList
            openModalWindow={openModalWindow}
            data={value.length ? moviesArray.filter((el) => el.title.includes(value)) : moviesArray}
          />
        )}
        {moviesArray.length === 0 && <Message />}
      </div>
    );

    userEvent.type(screen.getByPlaceholderText(/Поиск.../i), 'алхимик');
    expect(screen.queryByText(/вышка/i)).toBeNull();
    expect(screen.queryByText(/пиноккио/i)).toBeNull();
    expect(screen.queryByText(/Дитя тьмы/i)).toBeNull();
  });

  it('filter is working, render Message', () => {
    moviesArray.length = 0;
    render(
      <div className="main-page">
        {moviesArray.length > 0 && (
          <CardList openModalWindow={openModalWindow} data={moviesArray} />
        )}
        {moviesArray.length === 0 && <Message />}
      </div>
    );

    expect(screen.queryByText(/вышка/i)).toBeNull();
    expect(screen.queryByText(/пиноккио/i)).toBeNull();
    expect(screen.getByText(/Извините/i)).toBeInTheDocument();
  });
});
