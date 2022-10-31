import DataContext from 'context/DataContext';
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
    dispatch({ type: 'newInputValue', payload: (event.target as HTMLInputElement).value });
  }

  function keyDown(event: React.KeyboardEvent): void {
    if (!state.isFirstLoad) {
      dispatch({ type: 'newIsFirstLoad', payload: true });
    }

    if (event.key === 'Enter') {
      dispatch({ type: 'newValue', payload: (event.target as HTMLInputElement).value });
      dispatch({ type: 'newPage', payload: 1 });
      dispatch({ type: 'newSort', payload: 'popularity.desc' });
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
