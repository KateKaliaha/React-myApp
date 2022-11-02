// import { IFormCard } from 'data/interfaces';
// import { Action, ReducerContextValue, ReducerState } from 'data/types';
// import React, { createContext, ReactNode, Reducer, useReducer } from 'react';

// const initialState = {
//   cardForm: [],
// };

// export const ACTION = {
//   FORM_CARD: 'newFormCard',
// };

// const reducer: Reducer<ReducerState, Action> = (state, action): ReducerState => {
//   switch (action.type) {
//     case 'newFormCard':
//       return { ...state, cardForm: action.payload as IFormCard[] };
//     default:
//       throw new Error();
//   }
// };

// const DataContext = createContext<ReducerContextValue>({
//   state: initialState,
//   dispatch: () => {},
// });

// export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>;
// };

// export default DataContext;
