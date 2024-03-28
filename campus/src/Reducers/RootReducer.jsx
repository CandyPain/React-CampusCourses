import { combineReducers } from 'redux';
import registerReducer from './RegisterReducer.jsx';
import profileReducer from './ProfileReducer.jsx'
import groupReducer from './GroupReducer.jsx'
import roleReducer from './RoleReducer.jsx'
import coursesReducer from './CoursesReducer.jsx';

const rootReducer = combineReducers({
  registration: registerReducer,
  profile: profileReducer,
  group: groupReducer,
  role: roleReducer,
  course: coursesReducer
});

export default rootReducer;