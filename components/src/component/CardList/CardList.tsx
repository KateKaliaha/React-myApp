import { Card } from 'component/Card/Card';
import { ICardApi } from 'data/interfaces';
import React from 'react';

type CardListProps = Record<string, ICardApi[]>;

class CardList extends React.Component<CardListProps> {
  constructor(props: CardListProps) {
    super(props);
  }

  render() {
    return (
      <div className="card-list">
        {this.props.data.map((card: ICardApi) => (
          <Card movie={card} key={card.id} />
        ))}
      </div>
    );
  }
}

export { CardList };
