// packages/app/src/core/store/slices/quoteSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Plan } from '../../../types/plan';

export type QuoteType = 'forMe' | 'forSomeoneElse' | null;

interface QuoteState {
  type: QuoteType;
  selectedPlan: Plan | null;
}

const initialState: QuoteState = {
  type: null,
  selectedPlan: null,
};

const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setQuoteType: (state, action: PayloadAction<QuoteType>) => {
      state.type = action.payload;
    },
    setSelectedPlan: (state, action: PayloadAction<Plan>) => {
      state.selectedPlan = action.payload;
    },
    resetQuote: (state) => {
      state.type = null;
      state.selectedPlan = null;
    },
  },
});

export const { setQuoteType, setSelectedPlan, resetQuote } = quoteSlice.actions;
export default quoteSlice.reducer;