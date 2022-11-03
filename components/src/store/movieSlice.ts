import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ICardApi, IResponse } from 'data/interfaces';

type movieState = {
  movies: ICardApi[];
  data: {
    results: ICardApi[];
    totalResults: number;
  };
  loading: boolean;
};

const initialState: movieState = {
  movies: [],
  data: {
    results: [],
    totalResults: 0,
  },
  loading: false,
};

const PATH_SEARCH =
  'https://api.themoviedb.org/3/search/movie?api_key=9c5e0f16891cead9f73032e139a5c245&language=ru-Ru';

const PATH_DISCOVER =
  'https://api.themoviedb.org/3/discover/movie?api_key=9c5e0f16891cead9f73032e139a5c245&language=ru-Ru&primary_release_date.gte=2022-06-01&with_genres=28';

export const fetchDataSearch = createAsyncThunk<
  FetchData,
  { page: number; value: string },
  { rejectValue: string }
>('movies/fetchDataSearch', async function ({ page, value }, { rejectWithValue }) {
  const response = await fetch(`${PATH_SEARCH}&query=${value}&page=${page}`);
  const data = (await response.json()) as IResponse;
  if (!response.ok) {
    return rejectWithValue('Server error!');
  }
  return { results: data.results, totalResults: data.total_results };
});

export type FetchData = {
  results: ICardApi[];
  totalResults: number;
};

export const fetchDataDiscover = createAsyncThunk<
  FetchData,
  { page: number; value: string },
  { rejectValue: string }
>('movies/fetchDataDiscover', async function ({ page, value }, { rejectWithValue }) {
  let data;

  if (value.length) {
    const response = await fetch(`${PATH_DISCOVER}&page=${page}&sort_by=${value}`);
    if (!response.ok) {
      return rejectWithValue('Server error!');
    }
    data = (await response.json()) as IResponse;
  } else {
    const response = await fetch(`${PATH_DISCOVER}&page=${page}`);
    if (!response.ok) {
      return rejectWithValue('Server error!');
    }
    data = (await response.json()) as IResponse;
  }

  return { results: data.results, totalResults: data.total_results };
});

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setNewData(state, action: PayloadAction<ICardApi[]>) {
      state.movies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDataSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.data.totalResults = action.payload.totalResults;
      })
      .addCase(fetchDataDiscover.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDataDiscover.fulfilled, (state, action) => {
        state.loading = false;
        state.data.totalResults = action.payload.totalResults;
      });
  },
});

export const { setNewData } = movieSlice.actions;
export default movieSlice.reducer;
