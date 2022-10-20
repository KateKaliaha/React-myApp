import { Card } from 'component/Card/Card';
import { ICardApi } from 'data/interfaces';
import { CardListProps } from 'data/types';
import React from 'react';

export function CardList({ data, openModalWindow }: CardListProps) {
  return (
    <div className="card-list" onClick={openModalWindow}>
      {data.map((card: ICardApi) => (
        <Card movie={card} key={card.id} />
      ))}
    </div>
  );
}
