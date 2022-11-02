import React from 'react';
import { getPageCount, pagesArray } from 'utils/pages';
import { setNewCountMovieOnPage, setNewPage, setNewTotalPage } from 'store/pageComponentSlice';
import { useAppDispatch, useAppSelector } from '../../hook';

export const Pages = (): JSX.Element => {
  const { countMovieOnPage, page, totalPages, totalResults } = useAppSelector(
    (state) => state.pageComponent
  );
  const dispatch = useAppDispatch();
  const pages = pagesArray(totalPages!);

  function changeMoviesByPage(btnNumber: number): void {
    dispatch(setNewPage(btnNumber));
  }

  function changeCountMoviesOnPage(event: React.ChangeEvent<HTMLSelectElement>): void {
    dispatch(setNewPage(1));
    dispatch(setNewCountMovieOnPage(+event.target.value));
    dispatch(setNewTotalPage(getPageCount(totalResults!, +event.target.value)));
  }

  return (
    <div>
      <div className="pages-wrapper">
        {pages.map((item) => (
          <div
            data-testid={'page-btn'}
            className={item === page ? 'page-btn active-page-btn' : 'page-btn'}
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
          defaultValue={countMovieOnPage + ''}
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
