import { SearchProps } from 'data/types';
import React, { useEffect } from 'react';

export function Search({ onKeyDown, onChange, value }: SearchProps) {
  useEffect(() => {
    return () => {
      if (value !== null) {
        localStorage.setItem('value', value);
      } else {
        localStorage.removeItem('value');
      }
    };
  });

  async function keyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' && value !== '') {
      onKeyDown((event.target as HTMLInputElement).value);
    }
  }

  return (
    <input
      className="search"
      id="search"
      type="search"
      onChange={onChange}
      onKeyDown={keyDown}
      value={value ? value : ''}
      placeholder="Поиск..."
    ></input>
  );
}
