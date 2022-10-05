import React from 'react';
import { FaStar, FaHeart } from 'react-icons/fa';

export interface ICard {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

interface ICardProps {
  movie: ICard;
}

function Card({ movie }: ICardProps): JSX.Element {
  return (
    <>
      <div className="card">
        <img className="card-img" src={movie.poster_path} data-testid="img-card"></img>
        <h2 className="card-header">{movie.title}</h2>
        <div className="popular">
          <div className="rate-container">
            <FaStar />
            <p>{movie.vote_average}</p>
          </div>
          <div className="like-container">
            <FaHeart />
            <p>{movie.vote_count}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export { Card };
