
import {
    FETCH_ROLE_SUCCESS,
    FETCH_ROLE_FAILURE,
  } from '../Components/Actions/GetRole';

  
  const initialState = {
    role: null
  };
  
  const roleReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ROLE_SUCCESS:
        return {
          ...state,
          role: action.payload
        };
      case FETCH_ROLE_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default roleReducer;
  