import { combineReducers } from 'redux';
import registerReducer from './RegisterReducer.jsx';
import profileReducer from './ProfileReducer.jsx'
import groupReducer from './GroupReducer.jsx'
import roleReducer from './RoleReducer.jsx'

const rootReducer = combineReducers({
  registration: registerReducer,
  profile: profileReducer,
  group: groupReducer,
  role: roleReducer,
});

export default rootReducer;