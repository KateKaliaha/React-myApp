import React, { useEffect } from 'react';
import { setNewPage } from 'store/pageComponentSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import {
  setNewSearchValue,
  setNewInputValue,
  setFirstLoad,
  setNewSortValue,
} from 'store/mainPageSlice';

export function Search(): JSX.Element {
  const { inputValue, isFirstLoad } = useAppSelector((state) => state.mainPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      if (inputValue !== undefined || inputValue !== '') {
        localStorage.setItem('value', inputValue!);
      } else {
        localStorage.removeItem('value');
      }
    };
  });

  const handleChangeInputSearch = (event: React.FormEvent) =>
    dispatch(setNewInputValue((event.target as HTMLInputElement).value));

  function keyDown(event: React.KeyboardEvent): void {
    if (!isFirstLoad) {
      dispatch(setFirstLoad(true));
    }

    if (event.key === 'Enter') {
      dispatch(setNewPage(1));
      dispatch(setNewSearchValue((event.target as HTMLInputElement).value));
      dispatch(setNewSortValue('popularity.desc'));
    }
  }

  return (
    <input
      className="search"
      id="search"
      type="search"
      onChange={handleChangeInputSearch}
      onKeyDown={keyDown}
      value={inputValue ? inputValue : ''}
      placeholder="Поиск..."
    ></input>
  );
}
