import { createSlice } from '@reduxjs/toolkit';
import { fetchDaily, fetchLastNDays } from '../thunks';

const initialState = {
  today: null,
  lastNDays: null,
  selectedCurrency: null,
};

export const currency = createSlice({
  initialState,
  name: 'currency',
  reducers: {
    setSelectedCurrency: (state, action) => {
      const currencyName = action.payload;
      state.selectedCurrency = currencyName;
    },
  },
  extraReducers: {
    [fetchDaily.fulfilled]: (state, action) => {
      state.today = action.payload;
    },
    [fetchLastNDays.fulfilled]: (state, action) => {
      state.lastNDays = action.payload;
    },
  },
});
export const { setSelectedCurrency } = currency.actions;
export default currency.reducer;
