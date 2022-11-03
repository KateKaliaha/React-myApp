import React, { useCallback, useEffect } from 'react';
import { Search } from 'component/Search/Search';
import { CardList } from 'component/CardList/CardList';
import { Message } from 'component/Message/Message';
import { Loader } from 'component/UI/Loader/Loader';
import { getPageCount, getPages } from 'utils/pages';
import { Pages } from '../../component/PagesForMainPage/Pages';
import { SortSelect } from 'component/SelectSortInput/SortSelect';
import { useAppDispatch, useAppSelector } from '../../hook';
import { FetchData, fetchDataSearch, fetchDataDiscover, setNewData } from 'store/movieSlice';
import { setNewTotalPage, setNewTotalResults } from 'store/pageComponentSlice';
import { AsyncThunk } from '@reduxjs/toolkit';

export function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.movie.movies);
  const isLoading = useAppSelector((state) => state.movie.loading);
  const totalResults = useAppSelector((state) => state.movie.data.totalResults);
  const { countMovieOnPage, page } = useAppSelector((state) => state.pageComponent);
  const { searchValue, isFirstLoad, sortValue } = useAppSelector((state) => state.mainPage);

  const getFetchDataByPagesAndValue = useCallback(
    async (
      func: AsyncThunk<FetchData, { page: number; value: string }, { rejectValue: string }>,
      {
        pageFetch,
        funcValue,
      }: {
        pageFetch: number;
        funcValue: string;
        sortValue?: string;
      },
      countMovieOnPage: number
    ) => {
      const limitMoviesOnPage = [20, 40, 60];

      if (countMovieOnPage === limitMoviesOnPage[0]) {
        const firstPage = (await dispatch(func({ page: pageFetch, value: funcValue })).unwrap())
          .results;
        dispatch(setNewData([...firstPage]));
      }

      if (countMovieOnPage === limitMoviesOnPage[1]) {
        const pagesArr = getPages(countMovieOnPage, pageFetch) as number[];
        const firstPage = (await dispatch(func({ page: pagesArr[0], value: funcValue })).unwrap())
          .results;
        const secondPage = (await dispatch(func({ page: pagesArr[1], value: funcValue })).unwrap())
          .results;
        dispatch(setNewData([...firstPage, ...secondPage]));
      }

      if (countMovieOnPage === limitMoviesOnPage[2]) {
        const pagesArr = getPages(countMovieOnPage, pageFetch) as number[];
        const firstPage = (await dispatch(func({ page: pagesArr[0], value: funcValue })).unwrap())
          .results;
        const secondPage = (await dispatch(func({ page: pagesArr[1], value: funcValue })).unwrap())
          .results;
        const thirdPage = (await dispatch(func({ page: pagesArr[1], value: funcValue })).unwrap())
          .results;
        dispatch(setNewData([...firstPage, ...secondPage, ...thirdPage]));
      }

      dispatch(setNewTotalResults(totalResults));
      dispatch(setNewTotalPage(getPageCount(totalResults!, countMovieOnPage)));
    },
    [dispatch, totalResults]
  );

  const getFetchDataDependingOnValue = useCallback(
    async (countMovieOnPage: number) => {
      if (searchValue === null || !searchValue.trim().length) {
        await getFetchDataByPagesAndValue(
          fetchDataDiscover,
          { pageFetch: page, funcValue: sortValue },
          countMovieOnPage
        );
      } else {
        await getFetchDataByPagesAndValue(
          fetchDataSearch,
          { pageFetch: page, funcValue: searchValue },
          countMovieOnPage
        );
      }
    },
    [getFetchDataByPagesAndValue, page, searchValue, sortValue]
  );

  useEffect(() => {
    getFetchDataDependingOnValue(countMovieOnPage);
  }, [countMovieOnPage, getFetchDataDependingOnValue, sortValue]);

  return (
    <div className="main-page">
      <Search />
      {isLoading ? (
        <Loader />
      ) : (
        data.length > 0 && (
          <>
            <SortSelect />
            <CardList />
            <Pages />
          </>
        )
      )}
      {data.length === 0 && isFirstLoad && <Message />}
    </div>
  );
}
