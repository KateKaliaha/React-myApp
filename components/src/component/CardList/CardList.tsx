import { Card } from 'component/Card/Card';
import { ICardApi } from 'data/interfaces';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hook';
import { setNewDisplayStyle } from 'store/mainPageSlice';

export function CardList(): JSX.Element {
  const data = useAppSelector((state) => state.movie.movies);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  function openMovieCard(event: React.MouseEvent): void {
    const id = +((event.target as HTMLElement).closest('.card')?.getAttribute('id') as string);

    if (id) {
      navigate(`${id}`);
      dispatch(setNewDisplayStyle('none'));
    }
  }

  return (
    <div className="card-list" onClick={openMovieCard}>
      {data.map((card: ICardApi, i) => (
        <Card movie={card} key={card.id + '' + i} />
      ))}
    </div>
  );
}
