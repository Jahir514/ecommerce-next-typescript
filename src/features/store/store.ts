import { configureStore } from '@reduxjs/toolkit';
import locationReducer from '../locations/locationSlice';
import categoriesReducer from '../categories/categoriesSlice';
import sidenavReducer from '../common/sidenav/sidenavSlice';
import { api } from '../api/api'; // Single RTK Query instance

export const store = configureStore({
  reducer: {
    location: locationReducer,
    sidenav: sidenavReducer,
    categories: categoriesReducer,
    [api.reducerPath]: api.reducer, // Only one RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
