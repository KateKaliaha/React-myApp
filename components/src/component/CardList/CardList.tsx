import { Card, ICard } from 'component/Card/Card';
import React from 'react';

type CardListProps = Record<string, ICard[]>;

class CardList extends React.Component<CardListProps> {
  constructor(props: CardListProps) {
    super(props);
  }

  render() {
    return (
      <div className="card-list">
        {this.props.data.map((card: ICard) => (
          <Card movie={card} key={card.id} />
        ))}
      </div>
    );
  }
}

export { CardList };
