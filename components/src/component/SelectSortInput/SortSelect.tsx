import DataContext, { ACTION } from 'context/DataContext';
import React, { useContext } from 'react';
import { getPageCount } from 'utils/pages';

export const SortSelect = (): JSX.Element => {
  const { state, dispatch } = useContext(DataContext);

  function sortMoviesByValue(event: React.ChangeEvent<HTMLSelectElement>): void {
    dispatch({ type: ACTION.PAGE, payload: 1 });
    dispatch({ type: ACTION.INPUT_VALUE, payload: '' });
    dispatch({ type: ACTION.SEARCH_VALUE, payload: null });
    dispatch({ type: ACTION.SORT_VALUE, payload: event.target.value });
    dispatch({
      type: ACTION.TOTAL_PAGES,
      payload: getPageCount(state.totalResults!, state.countMovieOnPage),
    });
    dispatch({ type: ACTION.FIRST_LOAD, payload: false });
    localStorage.removeItem('value');
  }

  return (
    <div className="select-wrapper">
      <select
        defaultValue={state.sort}
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
