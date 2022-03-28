import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  daily: {
    type: 'name',
    order: 'asc',
  },
  lastNDays: {
    type: 'date',
    order: 'desc',
  },
};

const sort = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setDailySort: (state, action) => {
      const type = action.payload;
      if (state.daily.type === type) {
        state.daily.order = state.daily.order === 'asc' ? 'desc' : 'asc';
      } else {
        state.daily.type = type;
        state.daily.order = initialState.daily.order;
      }
    },
    setLastNDaysSort: (state, action) => {
      const type = action.payload;
      if (state.lastNDays.type === type) {
        state.lastNDays.order =
          state.lastNDays.order === 'asc' ? 'desc' : 'asc';
      } else {
        state.lastNDays.type = type;
        state.lastNDays.order = initialState.lastNDays.order;
      }
    },
  },
});

export const { setDailySort, setLastNDaysSort } = sort.actions;
export default sort.reducer;
