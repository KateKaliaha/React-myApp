import { ICardApi, IFormCard } from 'data/interfaces';
import { Action, ReducerContextValue, ReducerState } from 'data/types';
import React, { createContext, ReactNode, Reducer, useReducer } from 'react';

const initialState = {
  display: 'flex',
  data: [],
  value: null,
  inputValue: undefined,
  page: 1,
  totalPages: undefined,
  totalResults: undefined,
  countMovieOnPage: 20,
  card: undefined,
  isFirstLoad: false,
  sort: 'popularity.desc',
  cardForm: [],
};

const reducer: Reducer<ReducerState, Action> = (state, action): ReducerState => {
  switch (action.type) {
    case 'newDisplayStyle':
      return { ...state, display: action.payload as string };
    case 'newData':
      return { ...state, data: action.payload as ICardApi[] };
    case 'newValue':
      return { ...state, value: action.payload as string | null };
    case 'newInputValue':
      return { ...state, inputValue: action.payload as string | undefined };
    case 'newPage':
      return { ...state, page: action.payload as number };
    case 'newTotalPages':
      return { ...state, totalPages: action.payload as number };
    case 'newTotalResults':
      return { ...state, totalResults: action.payload as number };
    case 'newCountMovieOnPage':
      return { ...state, countMovieOnPage: action.payload as number };
    case 'newCard':
      return { ...state, card: action.payload as ICardApi };
    case 'newIsFirstLoad':
      return { ...state, isFirstLoad: action.payload as boolean };
    case 'newSort':
      return { ...state, sort: action.payload as string };
    case 'newFormCard':
      return { ...state, cardForm: action.payload as IFormCard[] };
    default:
      throw new Error();
  }
};

const DataContext = createContext<ReducerContextValue>({
  state: initialState,
  dispatch: () => {},
});

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>;
};

export default DataContext;
