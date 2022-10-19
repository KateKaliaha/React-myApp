import React from 'react';
import { Search } from 'component/Search/Search';
import { CardList } from 'component/CardList/CardList';
import { Message } from 'component/Message/Message';
import { ICardApi, IResponse } from 'data/interfaces';

type CardsState = {
  data: ICardApi[];
};

type CardsProps = Record<string, unknown>;

const PATH = 'https://api.themoviedb.org/3/';
const API_KEY = 'api_key=9c5e0f16891cead9f73032e139a5c245';
const LANG_API_RESPONSE = 'ru-Ru';

class MainPage extends React.Component<CardsProps, CardsState> {
  page: number;

  constructor(props: CardsProps) {
    super(props);
    this.page = 1;
    this.state = {
      data: [],
    };
    this.getSearchCardList = this.getSearchCardList.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const localValue = localStorage.getItem('value') as string;
    if (localValue) {
      await this.getApiData('search', `query=${localValue}&page=${this.page}`);
    } else {
      await this.getApiData('discover', `page=${this.page}`);
    }
  }

  async getApiData(param: string, value: string) {
    await fetch(`${PATH}${param}/movie?${API_KEY}&language=${LANG_API_RESPONSE}&${value}`)
      .then((resp) => {
        if (resp.ok) {
          return resp.json() as Promise<IResponse>;
        }
        throw resp;
      })
      .then((data) => {
        if (param === 'search') {
          const valueForFilter = value.split('&')[0].split('=')[1];
          const filterData = data.results.filter((movie) =>
            movie.title.toLowerCase().includes(valueForFilter.toLowerCase())
          );
          this.setState({ data: [...filterData] });
        } else {
          this.setState({ data: [...data.results] });
        }
      })
      .catch((error) => console.error(error));
  }

  async getSearchCardList(value: string) {
    await this.getApiData('search', `query=${value}&page=${this.page}`);
  }

  render() {
    return (
      <div className="main-page">
        <Search getSearchCardList={this.getSearchCardList} />
        {this.state.data.length > 0 && <CardList data={this.state.data} />}
        {this.state.data.length === 0 && <Message />}
      </div>
    );
  }
}

export { MainPage };
