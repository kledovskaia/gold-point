import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  today: {},
  lastPeriod: {},
};

export const currency = createSlice({
  initialState,
  name: 'currency',
});

export const {} = currency.actions;
export default currency.reducer;
