
import {
    FETCH_GROUPS_SUCCESS,
    FETCH_GROUPS_FAILURE,
  } from '../Components/Actions/GetGroups';
  
  const initialState = {
    groupsList: [],
    loading: false,
    error: null,
  };
  
  const groupsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_GROUPS_SUCCESS:
        return {
          ...state,
          groupsList: action.payload,
          loading: false,
        };
      case FETCH_GROUPS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default groupsReducer;
  