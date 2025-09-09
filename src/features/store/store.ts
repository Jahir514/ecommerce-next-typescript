
import { configureStore } from '@reduxjs/toolkit';
import locationReducer from '../locations/locationSlice';
import { api } from '../api/api';

// Add other reducers here as needed

export const store = configureStore({
  reducer: {
    location: locationReducer,
    [api.reducerPath]: api.reducer, // RTK Query reducer
    // Add other feature reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // RTK Query middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
