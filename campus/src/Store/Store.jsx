import { configureStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const store = configureStore(reducer, applyMiddleware(thunk));

export default store;