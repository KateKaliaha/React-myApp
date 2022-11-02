import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type pageComponentState = {
  page: number;
  totalPages: number | undefined;
  totalResults: number | undefined;
  countMovieOnPage: number;
};

const initialState: pageComponentState = {
  page: 1,
  totalPages: undefined,
  totalResults: undefined,
  countMovieOnPage: 20,
};

const pageComponentSlice = createSlice({
  name: 'pageComponent',
  initialState,
  reducers: {
    setNewPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setNewTotalPage(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setNewTotalResults(state, action: PayloadAction<number>) {
      state.totalResults = action.payload;
    },
    setNewCountMovieOnPage(state, action: PayloadAction<number>) {
      state.countMovieOnPage = action.payload;
    },
  },
});

export const { setNewPage, setNewTotalPage, setNewTotalResults, setNewCountMovieOnPage } =
  pageComponentSlice.actions;
export default pageComponentSlice.reducer;
