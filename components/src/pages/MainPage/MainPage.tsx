import React, { useEffect, useState } from 'react';
import { Search } from 'component/Search/Search';
import { CardList } from 'component/CardList/CardList';
import { Message } from 'component/Message/Message';
import { ICardApi, IResponse } from 'data/interfaces';
import { ModalWindow } from 'component/ModalWindow/ModalWindow';
import { Loader } from 'component/UI/Loader/Loader';

export const PATH_SEARCH =
  'https://api.themoviedb.org/3/search/movie?api_key=9c5e0f16891cead9f73032e139a5c245&language=ru-Ru';

export const PATH_DISCOVER =
  'https://api.themoviedb.org/3/discover/movie?api_key=9c5e0f16891cead9f73032e139a5c245&language=ru-Ru';

export function MainPage(): JSX.Element {
  const page = 1;
  const [data, setData] = useState<ICardApi[]>([]);
  const [modalActive, setModalActive] = useState(false);
  const [card, setCard] = useState<ICardApi | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  const [value] = useState(localStorage.getItem('value') ? localStorage.getItem('value') : null);

  useEffect(() => {
    async function fetchPromiseStartPage() {
      if (value !== null) {
        await fetch(`${PATH_SEARCH}&query=${value}&page=${page}`)
          .then((resp) => {
            return resp.json() as Promise<IResponse>;
          })
          .then((data) => {
            const filterData = data.results.filter((movie) =>
              movie.title.toLowerCase().includes((value as string).toLowerCase())
            );
            setData(filterData);
          });
      } else {
        await fetch(`${PATH_DISCOVER}`)
          .then((resp) => {
            return resp.json() as Promise<IResponse>;
          })
          .then((data) => {
            setData(data.results);
          });
      }
      await setIsFirstLoad(true);
    }
    fetchPromiseStartPage();
    setIsFetching(false);
  }, [value]);

  async function getSearchCardList(value: string): Promise<void> {
    await setIsFetching(true);
    await fetch(`${PATH_SEARCH}&query=${value}&page=${page}`)
      .then((resp) => {
        return resp.json() as Promise<IResponse>;
      })
      .then((data) => {
        const filterData = data.results.filter((movie) =>
          movie.title.toLowerCase().includes(value.toLowerCase())
        );
        setData(filterData);
      });
    await setIsFirstLoad(true);
    await setIsFetching(false);
  }

  function openModalWindow(event: React.MouseEvent): void {
    const id = +((event.target as HTMLElement).closest('.card')?.getAttribute('id') as string);
    if (id) {
      const card = data.find((el) => el.id === id);
      setModalActive(true);
      setCard(card);
    }
  }

  function closeModalWindow(): void {
    setModalActive(false);
  }

  return (
    <div className="main-page">
      <Search getSearchCardList={getSearchCardList} />
      {isFetching ? (
        <Loader />
      ) : (
        data.length > 0 && <CardList data={data} openModalWindow={openModalWindow} />
      )}
      {data.length === 0 && isFirstLoad && <Message />}
      {modalActive && (
        <ModalWindow
          active={modalActive}
          movie={card as ICardApi}
          closeModalWindow={closeModalWindow}
        />
      )}
    </div>
  );
}
