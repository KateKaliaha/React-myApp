import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Search } from 'component/Search/Search';
import { CardList } from 'component/CardList/CardList';
import { Message } from 'component/Message/Message';
import { IResponse } from 'data/interfaces';
import { Loader } from 'component/UI/Loader/Loader';
import { getPageCount, getPages } from 'utils/pages';
import { Pages } from '../../component/PagesForMainPage/Pages';
import { SortSelect } from 'component/SelectSortInput/SortSelect';
import { getFetchDataDiscover, getFetchDataSearch } from 'services/apiService';
import DataContext, { ACTION } from 'context/DataContext';

export function MainPage(): JSX.Element {
  const { state, dispatch } = useContext(DataContext);

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
        dispatch({ type: ACTION.DATA, payload: [...firstPage.results] });
        totalResults = firstPage.total_results;
      }

      if (countMovieOnPage === limitMoviesOnPage[1]) {
        const pagesArr = getPages(countMovieOnPage, pageFetch) as number[];
        const firstPage = await func(pagesArr[0], funcValue);
        const secondPage = await func(pagesArr[1], funcValue);
        dispatch({ type: ACTION.DATA, payload: [...firstPage.results, ...secondPage.results] });
        totalResults = firstPage.total_results;
      }

      if (countMovieOnPage === limitMoviesOnPage[2]) {
        const pagesArr = getPages(countMovieOnPage, pageFetch) as number[];
        const firstPage = await func(pagesArr[0], funcValue);
        const secondPage = await func(pagesArr[1], funcValue);
        const thirdPage = await func(pagesArr[2], funcValue);
        dispatch({
          type: ACTION.DATA,
          payload: [...firstPage.results, ...secondPage.results, ...thirdPage.results],
        });
        totalResults = firstPage.total_results;
      }

      dispatch({ type: ACTION.TOTAL_RESULTS, payload: totalResults });
      dispatch({ type: ACTION.TOTAL_PAGES, payload: getPageCount(totalResults, countMovieOnPage) });
    },
    [dispatch]
  );

  const getFetchDataDependingOnValue = useCallback(
    async (countMovieOnPage: number, pageFetch: number, sortValue: string) => {
      await setIsFetching(true);

      if (state.value === null || !state.value.trim().length) {
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
          state.value
        );
      }

      await setIsFetching(false);
    },
    [getFetchDataByPagesAndValue, state.value]
  );

  useEffect(() => {
    getFetchDataDependingOnValue(state.countMovieOnPage, state.page, state.sort);
  }, [getFetchDataDependingOnValue, state.countMovieOnPage, state.page, state.sort]);

  return (
    <div className="main-page">
      <Search />
      {isFetching ? (
        <Loader />
      ) : (
        state.data.length > 0 && (
          <>
            <SortSelect />
            <CardList />
            <Pages />
          </>
        )
      )}
      {state.data.length === 0 && state.isFirstLoad && <Message />}
    </div>
  );
}
