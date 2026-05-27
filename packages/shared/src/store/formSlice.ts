import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserData {
  documentType: 'DNI' | 'CE';
  documentNumber: string;
  phone: string;
  privacyAccepted: boolean;
  commercialAccepted: boolean;
}

const initialState: UserData = {
  documentType: 'DNI',
  documentNumber: '',
  phone: '',
  privacyAccepted: false,
  commercialAccepted: false,
};

const formSlice = createSlice({
  name: 'userForm',
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<UserData>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { updateForm } = formSlice.actions;
export default formSlice.reducer;