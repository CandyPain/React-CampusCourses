
import {
    GET_COURSES_SUCCESS,
    GET_COURSES_ERROR,
  } from '../Components/Actions/GetCourses';
  import { SET_GROUP_ID } from '../Components/MainPage';
  
  const initialState = {
    coursesList: [],
    groupId: '',
    error: null,
  };
  
  const coursesReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COURSES_SUCCESS:
        return {
          ...state,
          coursesList: action.payload,
        };
      case GET_COURSES_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      case SET_GROUP_ID: 
        return {
          ...state,
          groupId: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default coursesReducer;
  