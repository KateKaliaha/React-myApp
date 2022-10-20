import { SearchProps } from 'data/types';
import React, { useEffect, useState } from 'react';

function Search({ getSearchCardList }: SearchProps) {
  const [value, setValue] = useState(
    localStorage.getItem('value') ? (localStorage.getItem('value') as string) : ''
  );

  useEffect(() => {
    return () => localStorage.setItem('value', value);
  });

  function handleChange(event: React.FormEvent) {
    setValue((event.target as HTMLInputElement).value);
  }

  async function keyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' && value !== '') {
      await getSearchCardList((event.target as HTMLInputElement).value);
    }
  }

  return (
    <input
      className="search"
      id="search"
      type="search"
      onChange={handleChange}
      onKeyDown={keyDown}
      value={value}
      placeholder="Поиск..."
    ></input>
  );
}

export { Search };
