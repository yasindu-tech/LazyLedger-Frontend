import { configureStore } from '@reduxjs/toolkit';
import { api } from './api'; // adjust the path as needed

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    // ...other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});