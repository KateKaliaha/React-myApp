import DataContext, { ACTION } from 'context/DataContext';
import React, { useContext } from 'react';
import { getPageCount, pagesArray } from 'utils/pages';

export const Pages = (): JSX.Element => {
  const { state, dispatch } = useContext(DataContext);
  const pages = pagesArray(state.totalPages!);

  function changeMoviesByPage(btnNumber: number): void {
    dispatch({ type: ACTION.PAGE, payload: btnNumber });
  }

  function changeCountMoviesOnPage(event: React.ChangeEvent<HTMLSelectElement>): void {
    dispatch({ type: ACTION.PAGE, payload: 1 });
    dispatch({ type: ACTION.COUNT_MOVIE_ON_PAGE, payload: +event.target.value });
    dispatch({
      type: ACTION.TOTAL_PAGES,
      payload: getPageCount(state.totalResults!, +event.target.value),
    });
  }

  return (
    <div>
      <div className="pages-wrapper">
        {pages.map((item) => (
          <div
            data-testid={'page-btn'}
            className={item === state.page ? 'page-btn active-page-btn' : 'page-btn'}
            key={item}
            onClick={() => changeMoviesByPage(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="select-wrapper">
        <span>Количество фильмов на странице</span>
        <select
          defaultValue={state.countMovieOnPage + ''}
          className="select-page"
          id="select-page"
          onChange={(event) => changeCountMoviesOnPage(event)}
        >
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="60">60</option>
        </select>
      </div>
    </div>
  );
};
