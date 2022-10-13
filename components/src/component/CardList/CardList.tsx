import { Card } from 'component/Card/Card';
import { ICardApi } from 'data/interfaces';
import { CardListProps } from 'data/types';
import React from 'react';

class CardList extends React.Component<CardListProps> {
  constructor(props: CardListProps) {
    super(props);
  }

  render() {
    return (
      <div className="card-list" onClick={this.props.openModalWindow}>
        {this.props.data.map((card: ICardApi) => (
          <Card movie={card} key={card.id} />
        ))}
      </div>
    );
  }
}

export { CardList };
