import React, { Component } from 'react';
import { Search } from 'component/Search/Search';
import { CardList } from 'component/CardList/CardList';
import { Message } from 'component/Message/Message';
import { ICardApi, IResponse } from 'data/interfaces';
import { CardsProps, CardsState } from 'data/types';
import { ModalWindow } from 'component/ModalWindow/ModalWindow';
import { Loader } from 'component/UI/Loader/Loader';

const PATH = 'https://api.themoviedb.org/3/';
const API_KEY = 'api_key=9c5e0f16891cead9f73032e139a5c245';
const LANG_API_RESPONSE = 'ru-Ru';

class MainPage extends Component<CardsProps, CardsState> {
  page: number;

  constructor(props: CardsProps) {
    super(props);
    this.page = 1;
    this.state = {
      data: [],
      modalActive: false,
      card: undefined,
      isFetching: false,
    };
    this.getSearchCardList = this.getSearchCardList.bind(this);
    this.openModalWindow = this.openModalWindow.bind(this);
    this.closeModalWindow = this.closeModalWindow.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const localValue = localStorage.getItem('value') as string;
    await this.setState({ isFetching: true });
    if (localValue) {
      await this.getApiData('search', `query=${localValue}&page=${this.page}`);
    } else {
      await this.getApiData('discover', `page=${this.page}`);
    }
    await this.setState({ isFetching: false });
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
    await this.setState({ isFetching: true });
    await this.getApiData('search', `query=${value}&page=${this.page}`);
    await this.setState({ isFetching: false });
  }

  openModalWindow(event: React.MouseEvent): void {
    const id = +((event.target as HTMLElement).closest('.card')?.getAttribute('id') as string);
    if (id) {
      const card = this.state.data.find((el) => el.id === id);

      this.setState({ modalActive: true, card: card });
    }
  }

  closeModalWindow(): void {
    this.setState({ modalActive: false });
  }

  render() {
    return (
      <div className="main-page">
        <Search getSearchCardList={this.getSearchCardList} />
        {this.state.isFetching ? (
          <Loader />
        ) : (
          this.state.data.length > 0 && (
            <CardList data={this.state.data} openModalWindow={this.openModalWindow} />
          )
        )}
        {this.state.data.length === 0 && !this.state.isFetching && <Message />}
        {this.state.modalActive && (
          <ModalWindow
            active={this.state.modalActive}
            movie={this.state.card as ICardApi}
            closeModalWindow={this.closeModalWindow}
          />
        )}
      </div>
    );
  }
}

export { MainPage };
