import { configureStore} from '@reduxjs/toolkit';
import reducer from '../Reducers/RootReducer';
import {thunk} from 'redux-thunk';

const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
  });

export default store;
