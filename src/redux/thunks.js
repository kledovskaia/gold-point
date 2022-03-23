import { createAsyncThunk } from '@reduxjs/toolkit';

const PERIOD_DAYS = 10;

export const fetchDaily = createAsyncThunk('currency/fetchDaily', async () => {
  return await currencyAPI.fetchDaily();
});

export const fetchLastNDays = createAsyncThunk(
  'currency/fetchLastNDays',
  async (period = PERIOD_DAYS) => {
    return await currencyAPI.fetchLastNDays(period);
  }
);
