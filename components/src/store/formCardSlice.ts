import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormCard } from 'data/interfaces';

type formCardState = {
  cardForm: IFormCard[];
};

const initialState: formCardState = {
  cardForm: [],
};

const formCardSlice = createSlice({
  name: 'formCards',
  initialState,
  reducers: {
    setNewCardForm(state, action: PayloadAction<IFormCard[]>) {
      state.cardForm = action.payload;
    },
  },
});

export const { setNewCardForm } = formCardSlice.actions;
export default formCardSlice.reducer;
