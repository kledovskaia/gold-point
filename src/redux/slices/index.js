import { combineReducers } from '@reduxjs/toolkit';
import currency from './currency';
import error from './error';
import loading from './loading';
import sort from './sort';

export const rootReducer = combineReducers({
  currency,
  error,
  loading,
  sort,
});
