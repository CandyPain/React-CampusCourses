// reducers/courseDetailsReducer.js

import {
    FETCH_COURSE_DETAILS_SUCCESS,
    FETCH_COURSE_DETAILS_FAILURE,
  } from '../Components/Actions/GetDetails';
  
  import { SET_COURSE_ID } from '../Components/CoursesPage';
  const initialState = {
    courseDetails: null,
    error: '',
    courseId: ''
  };
  
  const courseDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_COURSE_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          courseDetails: action.payload,
          error: '',
        };
      case FETCH_COURSE_DETAILS_FAILURE:
        return {
          ...state,
          loading: false,
          courseDetails: null,
          error: action.payload,
        };
      case SET_COURSE_ID:
        return{
            ...state,
            courseId:action.payload
        }
      default:
        return state;
    }
  };
  
  export default courseDetailsReducer;
  