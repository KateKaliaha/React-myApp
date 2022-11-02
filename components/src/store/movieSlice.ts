import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICardApi } from 'data/interfaces';

type movieState = {
  movies: ICardApi[];
};

const initialState: movieState = {
  movies: [],
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setNewData(state, action: PayloadAction<ICardApi[]>) {
      state.movies = action.payload;
    },
  },
});

export const { setNewData } = movieSlice.actions;
export default movieSlice.reducer;
