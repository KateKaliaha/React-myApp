import { Card, ICard } from 'component/Card/Card';
import { listMovies } from 'data/data';
import React from 'react';

function CardList() {
  return (
    <div className="card-list">
      {listMovies.map((card: ICard) => (
        <Card movie={card} key={card.id} />
      ))}
    </div>
  );
}

export { CardList };
