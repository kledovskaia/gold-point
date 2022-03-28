import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: 'name',
  order: 'asc',
};

const sort = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort: (state, action) => {
      const type = action.payload;
      if (state.type === type) {
        state.order = state.order === 'asc' ? 'desc' : 'asc';
      } else {
        state.type = type;
        state.order = initialState.order;
      }
    },
  },
});

export const { setSort } = sort.actions;
export default sort.reducer;
