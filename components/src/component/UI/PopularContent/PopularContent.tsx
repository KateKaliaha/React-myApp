import { PopularContentProps } from 'data/types';
import React from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';

export function PopularContent({ names, movie }: PopularContentProps): JSX.Element {
  return (
    <div className="popular">
      <div className={names[0]}>
        <FaStar />
        <p>{movie.vote_average}</p>
      </div>
      <div className={names[1]}>
        <FaHeart />
        <p>{movie.vote_count}</p>
      </div>
    </div>
  );
}
