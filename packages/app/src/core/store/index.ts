import { configureStore } from '@reduxjs/toolkit';
import quoteReducer from '../store/slices/quoteSlice';
import userReducer from './slices/userSlice';
import { userFormReducer } from '@rimac/shared';

export const store = configureStore({
  reducer: {
    userForm: userFormReducer,
    quote: quoteReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;