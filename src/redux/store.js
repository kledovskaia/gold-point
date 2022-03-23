import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './slices';

const middleware = [thunk];
const enhancer = applyMiddleware(...middleware);

export const store = createStore(rootReducer, enhancer);
