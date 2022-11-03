import { setNewPage, setNewTotalPage } from 'store/pageComponentSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import React from 'react';
import { getPageCount } from 'utils/pages';
import {
  setNewSearchValue,
  setNewInputValue,
  setFirstLoad,
  setNewSortValue,
} from 'store/mainPageSlice';

export const SortSelect = (): JSX.Element => {
  const { countMovieOnPage, totalResults } = useAppSelector((state) => state.pageComponent);

  const { sortValue } = useAppSelector((state) => state.mainPage);

  const dispatch = useAppDispatch();

  function sortMoviesByValue(event: React.ChangeEvent<HTMLSelectElement>): void {
    dispatch(setNewPage(1));
    dispatch(setNewInputValue(''));
    dispatch(setNewSearchValue(null));
    dispatch(setNewSortValue(event.target.value));
    dispatch(setNewTotalPage(getPageCount(totalResults!, countMovieOnPage)));
    dispatch(setFirstLoad(false));
    localStorage.removeItem('value');
  }

  return (
    <div className="select-wrapper">
      <select
        defaultValue={sortValue}
        className="select-sort"
        id="select-sort"
        onChange={sortMoviesByValue}
      >
        <option value="popularity.desc">По популярности ↓</option>
        <option value="popularity.asc">По популярности ↑</option>
        <option value="vote_count.desc">По зрительской симпатии ↓</option>
        <option value="vote_count.asc">По зрительской симпатии ↑</option>
      </select>
    </div>
  );
};
