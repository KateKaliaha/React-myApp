import DataContext, { ACTION } from 'context/DataContext';
import React, { useContext, useEffect } from 'react';

export function Search(): JSX.Element {
  const { state, dispatch } = useContext(DataContext);

  useEffect(() => {
    return () => {
      if (state.inputValue !== undefined || state.inputValue !== '') {
        localStorage.setItem('value', state.inputValue!);
      } else {
        localStorage.removeItem('value');
      }
    };
  });

  function handleChangeInputSearch(event: React.FormEvent): void {
    dispatch({ type: ACTION.INPUT_VALUE, payload: (event.target as HTMLInputElement).value });
  }

  function keyDown(event: React.KeyboardEvent): void {
    if (!state.isFirstLoad) {
      dispatch({ type: ACTION.FIRST_LOAD, payload: true });
    }

    if (event.key === 'Enter') {
      dispatch({ type: ACTION.SEARCH_VALUE, payload: (event.target as HTMLInputElement).value });
      dispatch({ type: ACTION.PAGE, payload: 1 });
      dispatch({ type: ACTION.SORT_VALUE, payload: 'popularity.desc' });
    }
  }

  return (
    <input
      className="search"
      id="search"
      type="search"
      onChange={handleChangeInputSearch}
      onKeyDown={keyDown}
      value={state.inputValue ? state.inputValue : ''}
      placeholder="Поиск..."
    ></input>
  );
}
