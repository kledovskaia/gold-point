import { createSlice } from '@reduxjs/toolkit';
import * as thunks from '../thunks';

const initialState = {
  onLoad: [],
  isLoading: false,
};

export const loading = createSlice({
  initialState,
  name: 'loading',
  reducers: {},
  extraReducers: Object.entries(thunks).reduce(
    (extraReducers, [key, thunk]) => ({
      ...extraReducers,
      [thunk.pending]: (state) => {
        state.onLoad.push(key);
        state.isLoading = !!state.onLoad.length;
      },
      [thunk.fulfilled]: (state) => {
        const index = state.onLoad.findIndex(key);
        state.onLoad.splice(index, 1);
        state.isLoading = !!state.onLoad.length;
      },
      [thunk.rejected]: (state) => {
        const index = state.onLoad.findIndex(key);
        state.onLoad.splice(index, 1);
        state.isLoading = !!state.onLoad.length;
      },
    }),
    {}
  ),
});

export const { setIsLoading } = loading.actions;
export default loading.reducer;
