
  import {
    GET_USERS_SUCCESS,
    GET_USERS_ERROR
  } from '../Components/Actions/GetAllUsers'
  
  const initialState = {
    allUsers: [],
  };
  
  const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USERS_SUCCESS:
          return {
            ...state,
            allUsers: action.payload
          };
      case GET_USERS_ERROR:
          return {
            ...state,
            error: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default usersReducer;
  