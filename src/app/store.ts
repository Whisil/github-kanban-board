import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from '../features/board/issuesSlice';

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
