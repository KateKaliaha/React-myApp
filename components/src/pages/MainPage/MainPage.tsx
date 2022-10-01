import React from 'react';
import { Search } from 'component/Search/Search';
import { CardList } from 'component/CardList/CardList';
import { listMovies } from 'data/data';
import { ICard } from 'component/Card/Card';
import { Message } from 'component/Message/Message';

type CardsState = {
  data: ICard[];
};

type CardsProps = Record<string, unknown>;

class MainPage extends React.Component<CardsProps, CardsState> {
  constructor(props: CardsProps) {
    super(props);
    this.state = {
      data: localStorage.getItem('value')
        ? [...listMovies].filter((card) =>
            card.title
              .toLowerCase()
              .includes((localStorage.getItem('value') as string).toLowerCase())
          )
        : [...listMovies],
    };
    this.filterCardList = this.filterCardList.bind(this);
  }

  filterCardList(value: string) {
    const filteredCards = listMovies.filter((card) =>
      card.title.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({ data: [...filteredCards] });
  }

  render() {
    return (
      <div className="main-page">
        <Search filter={this.filterCardList} />
        {this.state.data.length > 0 && <CardList data={this.state.data} />}
        {this.state.data.length === 0 && <Message />}
      </div>
    );
  }
}

export { MainPage };
