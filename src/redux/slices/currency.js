import { createSlice } from '@reduxjs/toolkit';
import { fetchDaily, fetchLastNDays } from '../thunks';

const initialState = {
  today: {},
  lastPeriod: {},
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
      state.lastPeriod = action.payload;
      state.today = action.payload[Object.keys(action.payload)[0]];
    },
  },
});

export default currency.reducer;
