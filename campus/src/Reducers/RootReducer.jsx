import { combineReducers } from 'redux';
import registerReducer from './RegisterReducer.jsx';
import profileReducer from './ProfileReducer.jsx'

const rootReducer = combineReducers({
  registration: registerReducer,
  profile: profileReducer,
});

export default rootReducer;