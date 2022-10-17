import React, { Component } from 'react';
import { Search } from 'component/Search/Search';
import { CardList } from 'component/CardList/CardList';
import { Message } from 'component/Message/Message';
import { ICardApi, IResponse } from 'data/interfaces';
import { CardsProps, CardsState } from 'data/types';
import { ModalWindow } from 'component/ModalWindow/ModalWindow';
import { Loader } from 'component/UI/Loader/Loader';

export const PATH_SEARCH =
  'https://api.themoviedb.org/3/search/movie?api_key=9c5e0f16891cead9f73032e139a5c245&language=ru-Ru';

export const PATH_DISCOVER =
  'https://api.themoviedb.org/3/discover/movie?api_key=9c5e0f16891cead9f73032e139a5c245&language=ru-Ru';

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
      value: localStorage.getItem('value') ? localStorage.getItem('value') : null,
    };
    this.getSearchCardList = this.getSearchCardList.bind(this);
    this.openModalWindow = this.openModalWindow.bind(this);
    this.closeModalWindow = this.closeModalWindow.bind(this);
    this.fetchPromiseStartPage = this.fetchPromiseStartPage.bind(this);
  }

  async componentDidMount(): Promise<void> {
    await this.setState({ isFetching: true });
    await this.fetchPromiseStartPage();
    await this.setState({ isFetching: false });
  }

  async fetchPromiseStartPage() {
    if (this.state.value !== null) {
      await fetch(`${PATH_SEARCH}&query=${this.state.value}&page=${this.page}`)
        .then((resp) => {
          return resp.json() as Promise<IResponse>;
        })
        .then((data) => {
          const filterData = data.results.filter((movie) =>
            movie.title.toLowerCase().includes((this.state.value as string).toLowerCase())
          );
          this.setState({ data: filterData });
        });
    } else {
      await fetch(`${PATH_DISCOVER}`)
        .then((resp) => {
          return resp.json() as Promise<IResponse>;
        })
        .then((data) => {
          this.setState({ data: data.results });
        });
    }
  }

  async getSearchCardList(value: string): Promise<void> {
    await this.setState({ isFetching: true });
    await fetch(`${PATH_SEARCH}&query=${value}&page=${this.page}`)
      .then((resp) => {
        return resp.json() as Promise<IResponse>;
      })
      .then((data) => {
        const filterData = data.results.filter((movie) =>
          movie.title.toLowerCase().includes(value.toLowerCase())
        );
        this.setState({ data: filterData });
      });
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

  render(): JSX.Element {
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

export default MainPage;
