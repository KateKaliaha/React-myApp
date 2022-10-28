import { SelectSortProps } from 'data/types';
import React from 'react';

export const SortSelect = ({ sort, onChange }: SelectSortProps) => {
  return (
    <div className="select-wrapper">
      <select
        defaultValue={sort}
        className="select-sort"
        id="select-sort"
        onChange={(event) => onChange(event)}
      >
        <option value="popularity.desc">По популярности ↓</option>
        <option value="popularity.asc">По популярности ↑</option>
        <option value="vote_count.desc">По зрительской симпатии ↓</option>
        <option value="vote_count.asc">По зрительской симпатии ↑</option>
      </select>
    </div>
  );
};
