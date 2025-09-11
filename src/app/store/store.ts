import { configureStore } from '@reduxjs/toolkit';
import locationReducer from '../../features/locations/locationSlice';
import categoriesReducer from '../../features/categories/categoriesSlice';
import sidenavReducer from '../../features/common/sidenav/sidenavSlice';
import offerReducer from '../../features/offer/offerSlice';
import { api } from '../../features/api/api'; // Single RTK Query instance

export const store = configureStore({
  reducer: {
    location: locationReducer,
    sidenav: sidenavReducer,
    categories: categoriesReducer,
    offer: offerReducer,
    [api.reducerPath]: api.reducer, // Only one RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
