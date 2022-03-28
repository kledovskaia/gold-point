import { createSlice } from '@reduxjs/toolkit';
import { fetchDaily, fetchLastNDays } from '../thunks';

const initialState = {
  today: null,
  lastNDays: null,
};

export const currency = createSlice({
  initialState,
  name: 'currency',
  reducers: {},
  extraReducers: {
    [fetchDaily.fulfilled]: (state, action) => {
      state.today = action.payload;
    },
    [fetchLastNDays.fulfilled]: (state, action) => {
      state.lastNDays = action.payload;
    },
  },
});

export default currency.reducer;
