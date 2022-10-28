import { PagesProps } from 'data/types';
import React from 'react';

export const Pages = ({ pages, page, onClick, countMovieOnPage, onChange }: PagesProps) => {
  return (
    <div>
      <div className="pages-wrapper">
        {pages.map((item) => (
          <div
            className={item === page ? 'page-btn active-page-btn' : 'page-btn'}
            key={item}
            onClick={async () => await onClick(item)}
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
          onChange={(event) => onChange(event)}
        >
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="60">60</option>
        </select>
      </div>
    </div>
  );
};
