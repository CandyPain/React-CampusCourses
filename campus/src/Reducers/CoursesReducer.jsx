
import {
    GET_COURSES_SUCCESS,
    GET_COURSES_ERROR,
  } from '../Components/Actions/GetCourses';
  
  const initialState = {
    coursesList: [],
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
      default:
        return state;
    }
  };
  
  export default coursesReducer;
  