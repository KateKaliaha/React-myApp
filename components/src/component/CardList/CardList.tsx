import { Card } from 'component/Card/Card';
import DataContext, { ACTION } from 'context/DataContext';
import { ICardApi } from 'data/interfaces';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export function CardList(): JSX.Element {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(DataContext);

  function openMovieCard(event: React.MouseEvent): void {
    const id = +((event.target as HTMLElement).closest('.card')?.getAttribute('id') as string);

    if (id) {
      navigate(`${id}`);
      const card = state.data.find((el) => el.id === id) as ICardApi;
      dispatch({ type: ACTION.DISPLAY_STYLE, payload: 'none' });
      dispatch({ type: ACTION.MOVIE_CARD, payload: card });
    }
  }

  return (
    <div className="card-list" onClick={openMovieCard}>
      {state.data.map((card: ICardApi, i) => (
        <Card movie={card} key={card.id + '' + i} />
      ))}
    </div>
  );
}
