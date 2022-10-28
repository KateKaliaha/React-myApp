import React, { useEffect, useState } from 'react';
import { Search } from 'component/Search/Search';
import { CardList } from 'component/CardList/CardList';
import { Message } from 'component/Message/Message';
import { ICardApi, IResponse } from 'data/interfaces';
import { ModalWindow } from 'component/ModalWindow/ModalWindow';
import { Loader } from 'component/UI/Loader/Loader';
import { getPageCount, getPages, pagesArray } from 'utils/pages';
import { Pages } from '../../component/PagesForMainPage/Pages';
import { SortSelect } from 'component/SelectSortInput/SortSelect';
import { getFetchDataDiscover, getFetchDataSearch } from 'services/apiService';

export function MainPage(): JSX.Element {
  const [page, setPage] = useState(
    localStorage.getItem('page') ? +(localStorage.getItem('page') as string) : 1
  );
  const [totalPages, setTotalPages] = useState<number>();
  const [totalResults, setTotalResults] = useState<number>();
  const [countMovieOnPage, setCountMovieOnPage] = useState(
    localStorage.getItem('countOnPage') ? +(localStorage.getItem('countOnPage') as string) : 20
  );
  const [data, setData] = useState<ICardApi[]>([]);
  const [modalActive, setModalActive] = useState(false);
  const [card, setCard] = useState<ICardApi | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  const [value, setValue] = useState(
    localStorage.getItem('value') ? localStorage.getItem('value') : null
  );
  const [sort, setSort] = useState('popularity.desc');
  const pages = pagesArray(totalPages!);

  useEffect(() => {
    if (!isFirstLoad) {
      async function fetchPromiseStartPage() {
        if (value !== null && value !== '') {
          await getFetchDataByPagesAndValue(getFetchDataSearch, countMovieOnPage, page, value);
        } else {
          await getFetchDataByPagesAndValue(getFetchDataDiscover, countMovieOnPage, page, sort);
        }
        await setIsFetching(false);
        await setIsFirstLoad(true);
      }
      fetchPromiseStartPage();
    }
  }, [countMovieOnPage, isFirstLoad, page, sort, value]);

  useEffect(() => {
    return () => {
      localStorage.setItem('page', page + '');
      localStorage.setItem('countOnPage', countMovieOnPage + '');
    };
  }, [countMovieOnPage, page]);

  async function getSearchCardList(value: string): Promise<void> {
    await setValue(value);
    await setIsFetching(true);
    await getFetchDataByPagesAndValue(getFetchDataSearch, countMovieOnPage, 1, value);
    await setIsFetching(false);
    await setPage(1);
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

  async function getFetchDataByPagesAndValue(
    func: (page: number, value: string) => Promise<IResponse>,
    countMovieOnPage: number,
    pageFetch: number,
    funcValue: string
  ) {
    const limitMoviesOnPage = [20, 40, 60];
    let totalResults = 0;

    if (countMovieOnPage === limitMoviesOnPage[0]) {
      const firstPage = await func(pageFetch, funcValue);
      setData(firstPage.results);
      totalResults = firstPage.total_results;
    }

    if (countMovieOnPage === limitMoviesOnPage[1]) {
      const pagesArr = getPages(countMovieOnPage, pageFetch) as number[];
      const firstPage = await func(pagesArr[0], funcValue);
      const secondPage = await func(pagesArr[1], funcValue);
      setData([...firstPage.results, ...secondPage.results]);
      totalResults = firstPage.total_results;
    }

    if (countMovieOnPage === limitMoviesOnPage[2]) {
      const pagesArr = getPages(countMovieOnPage, pageFetch) as number[];
      const firstPage = await func(pagesArr[0], funcValue);
      const secondPage = await func(pagesArr[1], funcValue);
      const thirdPage = await func(pagesArr[2], funcValue);
      setData([...firstPage.results, ...secondPage.results, ...thirdPage.results]);
      totalResults = firstPage.total_results;
    }

    setTotalResults(totalResults);
    setTotalPages(getPageCount(totalResults, countMovieOnPage));
  }

  async function changeMoviesByPage(btnNumber: number) {
    await setPage(btnNumber);
    await getFetchDataDependingOnValue(countMovieOnPage, btnNumber, sort);
  }

  async function changeCountMoviesOnPage(event: React.ChangeEvent<HTMLSelectElement>) {
    await setPage(1);
    await setCountMovieOnPage(+event.target.value);
    await setTotalPages(getPageCount(totalResults!, +event.target.value));
    await getFetchDataDependingOnValue(+event.target.value, 1, sort);
  }

  async function getFetchDataDependingOnValue(
    countMovieOnPage: number,
    pageFetch: number,
    sortValue: string
  ) {
    await setIsFetching(true);

    if (value === null) {
      await getFetchDataByPagesAndValue(
        getFetchDataDiscover,
        countMovieOnPage,
        pageFetch,
        sortValue
      );
    } else if (value === '') {
      await getFetchDataByPagesAndValue(
        getFetchDataDiscover,
        countMovieOnPage,
        pageFetch,
        sortValue
      );
    } else {
      await getFetchDataByPagesAndValue(getFetchDataSearch, countMovieOnPage, pageFetch, value);
    }

    await setIsFetching(false);
  }

  async function sortMoviesByValue(event: React.ChangeEvent<HTMLSelectElement>) {
    await setPage(1);
    await setValue('');
    await localStorage.removeItem('value');
    setSort(event.target.value);
    await setTotalPages(getPageCount(totalResults!, countMovieOnPage));
    await setIsFetching(true);
    await getFetchDataByPagesAndValue(
      getFetchDataDiscover,
      countMovieOnPage,
      1,
      event.target.value
    );
    await setIsFetching(false);
  }

  async function handleChangeInputSearch(event: React.FormEvent) {
    await setValue((event.target as HTMLInputElement).value);
    await setSort('popularity.desc');
  }

  return (
    <div className="main-page">
      <Search onKeyDown={getSearchCardList} onChange={handleChangeInputSearch} value={value} />
      {isFetching ? (
        <Loader />
      ) : (
        data.length > 0 && (
          <>
            <SortSelect sort={sort} onChange={sortMoviesByValue} />
            <CardList data={data} openModalWindow={openModalWindow} />
            <Pages
              pages={pages}
              page={page}
              onClick={changeMoviesByPage}
              countMovieOnPage={countMovieOnPage}
              onChange={changeCountMoviesOnPage}
            />
          </>
        )
      )}
      {data.length === 0 && isFirstLoad && <Message />}
      {modalActive && <ModalWindow movie={card as ICardApi} closeModalWindow={closeModalWindow} />}
    </div>
  );
}
