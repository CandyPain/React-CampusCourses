// reducers/courseDetailsReducer.js

import {
    FETCH_COURSE_DETAILS_SUCCESS,
    FETCH_COURSE_DETAILS_FAILURE,
  } from '../Components/Actions/GetDetails';
import {ACCEPT_COURSE_SUCCESS} from '../Components/Actions/PostAcceptCourse';
import { SET_STUDENT_INFO } from '../Components/DetailPage';
  
  import { SET_COURSE_ID } from '../Components/CoursesPage';
  const initialState = {
    courseDetails: null,
    error: '',
    courseId: '',
    hasAccept: false,
    studentId: '',
    studentName: ''
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
        };
      case ACCEPT_COURSE_SUCCESS:
          return{
            ...state,
            hasAccept: true
          };
      case SET_STUDENT_INFO:
        return{
          ...state,
          studentId:action.payload.studentId,
          studentName:action.payload.studentName
        }
      default:
        return state;
    }
  };
  
  export default courseDetailsReducer;
  