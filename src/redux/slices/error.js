import { createSlice } from '@reduxjs/toolkit';
import * as thunks from '../thunks';

const initialState = {
  value: null,
};

export const error = createSlice({
  initialState,
  name: 'error',
  reducers: {},
  extraReducers: Object.values(thunks).reduce(
    (extraReducers, thunk) => ({
      ...extraReducers,
      [thunk.rejected]: (state, action) => {
        state.value = action.payload;
      },
    }),
    {}
  ),
});

export default error.reducer;
