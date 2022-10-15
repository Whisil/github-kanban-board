import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';

export const store = configureStore({
  reducer: {
    counter: boardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
