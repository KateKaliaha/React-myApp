import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardList } from 'component/CardList/CardList';
import { Message } from 'component/Message/Message';
import { Search } from 'component/Search/Search';
import React from 'react';

const handleChange = jest.fn();
const filterCardList = jest.fn();
const moviesArray = [
  {
    id: 760161,
    original_language: 'en',
    original_title: 'Orphan: First Kill',
    overview:
      '2007 год. Сбежав из эстонской психиатрической больницы, 31-летняя женщина Лина, которая из-за заболевания выглядит на 9 лет, находит среди объявлений о пропавших детях похожую на себя девочку. Та оказывается из богатой американской семьи, и вот уже чудом обнаруженная «Эстер» возвращается к счастливым «родителям» и «старшему брату».',
    poster_path: 'https://imagetmdb.cub.watch/t/p/w300//ly3KoisxYZvUTmrica3BsxzONwK.jpg',
    release_date: '2022-07-27',
    title: 'Дитя тьмы: первая жертва',
    vote_average: 7,
    vote_count: 718,
  },
  {
    id: 985939,
    original_language: 'en',
    original_title: 'Fall',
    overview:
      'После гибели Дэна в результате падения со скалы его жена Бекки, ранее увлекавшаяся экстремальными развлечениями, впала в депрессию. Год спустя девушка всё ещё не может прийти в себя и регулярно заливает горе алкоголем, когда в её жизни внезапно появляется старая боевая подруга Хантер. Та предлагает почтить память Дэна, забравшись на телерадиомачту B67 и развеяв там его прах. Девушки отправляются к самому высокому сооружению Соединённых Штатов, даже не представляя, с чем им придётся столкнуться на его верхушке.',
    poster_path: 'https://imagetmdb.cub.watch/t/p/w300//8xukbVG9JJfnpcdIEYPijVVOfhH.jpg',
    release_date: '2022-08-11',
    title: 'Вышка',
    vote_average: 7.4,
    vote_count: 997,
  },
  {
    id: 532639,
    original_language: 'en',
    original_title: 'Pinocchio',
    overview:
      'Сверчок Джимини забирается в дом старого столяра Джеппетто, который заканчивает работу над деревянной куклой-марионеткой Пиноккио. Перед сном сверчок загадывает желание, чтобы Пиноккио стал живым мальчиком.',
    poster_path: 'https://imagetmdb.cub.watch/t/p/w300//khvGzJQwrXT1DZaQaYYPPD52gxb.jpg',
    release_date: '2022-09-07',
    title: 'Пиноккио',
    vote_average: 6.8,
    vote_count: 706,
  },
];

describe('SearchBar', () => {
  it('render search component', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText(/Поиск.../i);

    expect(input).toBeInTheDocument;
  });

  it('input focus', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText(/Поиск.../i);

    expect(input).not.toHaveFocus;
    input.focus();
    expect(input).toHaveFocus;
  });

  it('handleChange works', () => {
    render(<input placeholder="Поиск..." onChange={handleChange} />);

    userEvent.type(screen.getByPlaceholderText(/Поиск.../i), 'пи');

    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it('typing in Search works', () => {
    render(<Search filter={filterCardList} />);

    expect(screen.queryByDisplayValue(/пи/)).toBeNull();
    userEvent.type(screen.getByPlaceholderText(/Поиск.../i), 'пи');

    expect(screen.queryByDisplayValue(/пи/)).toBeInTheDocument();
  });

  it('filter is working, render CardList', () => {
    const value = 'Выш';
    render(
      <div className="main-page">
        <input placeholder="Поиск..." value="Выш" onChange={handleChange} />
        {moviesArray.length > 0 && (
          <CardList
            data={value.length ? moviesArray.filter((el) => el.title.includes(value)) : moviesArray}
          />
        )}
        {moviesArray.length === 0 && <Message />}
      </div>
    );

    userEvent.type(screen.getByPlaceholderText(/Поиск.../i), 'Выш');
    expect(screen.getByText(/вышка/i)).toBeInTheDocument();
    expect(screen.queryByText(/пиноккио/i)).toBeNull();
  });

  it('filter is working, empty cards', () => {
    const value = 'алхимик';
    render(
      <div className="main-page">
        <input placeholder="Поиск..." value="Выш" onChange={handleChange} />
        {moviesArray.length > 0 && (
          <CardList
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
        {moviesArray.length > 0 && <CardList data={moviesArray} />}
        {moviesArray.length === 0 && <Message />}
      </div>
    );

    expect(screen.queryByText(/вышка/i)).toBeNull();
    expect(screen.queryByText(/пиноккио/i)).toBeNull();
    expect(screen.getByText(/Извините/i)).toBeInTheDocument();
  });
});
