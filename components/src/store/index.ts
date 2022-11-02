import { configureStore } from '@reduxjs/toolkit';
import MovieReducer from './movieSlice';
import PageReducer from './pageComponentSlice';
import MainPageReducer from './mainPageSlice';
import FormCardReducer from './formCardSlice';

const store = configureStore({
  reducer: {
    movie: MovieReducer,
    pageComponent: PageReducer,
    mainPage: MainPageReducer,
    formCard: FormCardReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
