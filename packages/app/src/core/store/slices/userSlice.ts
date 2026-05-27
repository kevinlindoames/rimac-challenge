import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  name: string;
  lastName: string;
  birthDay: string;
  age?: number; // opcional, calculado
}

interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setUserLoading, setUserError } = userSlice.actions;
export default userSlice.reducer;