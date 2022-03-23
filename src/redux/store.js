import { createStore } from '@reduxjs/toolkit';
import rootReducer from './slices';

export const store = createStore(rootReducer);
