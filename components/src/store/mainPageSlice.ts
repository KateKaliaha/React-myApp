import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type mainPageState = {
  display: string;
  searchValue: string | null;
  inputValue: string | undefined;
  isFirstLoad: boolean;
  sortValue: string;
};

const initialState: mainPageState = {
  display: 'flex',
  searchValue: null,
  inputValue: undefined,
  isFirstLoad: false,
  sortValue: 'popularity.desc',
};

const mainPageSlice = createSlice({
  name: 'value',
  initialState,
  reducers: {
    setNewDisplayStyle(state, action: PayloadAction<string>) {
      state.display = action.payload;
    },
    setNewSearchValue(state, action: PayloadAction<string | null>) {
      state.searchValue = action.payload;
    },
    setNewInputValue(state, action: PayloadAction<string>) {
      state.inputValue = action.payload;
    },
    setFirstLoad(state, action: PayloadAction<boolean>) {
      state.isFirstLoad = action.payload;
    },
    setNewSortValue(state, action: PayloadAction<string>) {
      state.sortValue = action.payload;
    },
  },
});

export const {
  setNewDisplayStyle,
  setNewSearchValue,
  setNewInputValue,
  setFirstLoad,
  setNewSortValue,
} = mainPageSlice.actions;
export default mainPageSlice.reducer;
