import React, { useCallback, useEffect, useState } from 'react';
import { Search } from 'component/Search/Search';
import { CardList } from 'component/CardList/CardList';
import { Message } from 'component/Message/Message';
import { IResponse } from 'data/interfaces';
import { Loader } from 'component/UI/Loader/Loader';
import { getPageCount, getPages } from 'utils/pages';
import { Pages } from '../../component/PagesForMainPage/Pages';
import { SortSelect } from 'component/SelectSortInput/SortSelect';
import { getFetchDataDiscover, getFetchDataSearch } from 'services/apiService';
import { useAppDispatch, useAppSelector } from '../../hook';
import { setNewData } from 'store/movieSlice';
import { setNewTotalPage, setNewTotalResults } from 'store/pageComponentSlice';

export function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.movie.movies);
  const { countMovieOnPage, page } = useAppSelector((state) => state.pageComponent);
  const { searchValue, isFirstLoad, sortValue } = useAppSelector((state) => state.mainPage);

  const [isFetching, setIsFetching] = useState(true);

  const getFetchDataByPagesAndValue = useCallback(
    async (
      func: (page: number, value: string) => Promise<IResponse>,
      countMovieOnPage: number,
      pageFetch: number,
      funcValue: string
    ) => {
      const limitMoviesOnPage = [20, 40, 60];
      let totalResults = 0;

      if (countMovieOnPage === limitMoviesOnPage[0]) {
        const firstPage = await func(pageFetch, funcValue);
        dispatch(setNewData([...firstPage.results]));
        totalResults = firstPage.total_results;
      }

      if (countMovieOnPage === limitMoviesOnPage[1]) {
        const pagesArr = getPages(countMovieOnPage, pageFetch) as number[];
        const firstPage = await func(pagesArr[0], funcValue);
        const secondPage = await func(pagesArr[1], funcValue);
        dispatch(setNewData([...firstPage.results, ...secondPage.results]));
        totalResults = firstPage.total_results;
      }

      if (countMovieOnPage === limitMoviesOnPage[2]) {
        const pagesArr = getPages(countMovieOnPage, pageFetch) as number[];
        const firstPage = await func(pagesArr[0], funcValue);
        const secondPage = await func(pagesArr[1], funcValue);
        const thirdPage = await func(pagesArr[2], funcValue);
        dispatch(setNewData([...firstPage.results, ...secondPage.results, ...thirdPage.results]));
        totalResults = firstPage.total_results;
      }
      dispatch(setNewTotalResults(totalResults));
      dispatch(setNewTotalPage(getPageCount(totalResults, countMovieOnPage)));
    },
    [dispatch]
  );

  const getFetchDataDependingOnValue = useCallback(
    async (countMovieOnPage: number, pageFetch: number, sortValue: string) => {
      await setIsFetching(true);

      if (searchValue === null || !searchValue.trim().length) {
        await getFetchDataByPagesAndValue(
          getFetchDataDiscover,
          countMovieOnPage,
          pageFetch,
          sortValue
        );
      } else {
        await getFetchDataByPagesAndValue(
          getFetchDataSearch,
          countMovieOnPage,
          pageFetch,
          searchValue
        );
      }

      await setIsFetching(false);
    },
    [getFetchDataByPagesAndValue, searchValue]
  );

  useEffect(() => {
    getFetchDataDependingOnValue(countMovieOnPage, page, sortValue);
  }, [countMovieOnPage, getFetchDataDependingOnValue, page, sortValue]);

  return (
    <div className="main-page">
      <Search />
      {isFetching ? (
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
