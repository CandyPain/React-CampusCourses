
import {
    GET_COURSES_SUCCESS,
    GET_COURSES_ERROR,
  } from '../Components/Actions/GetCourses';
  import { SET_GROUP_ID } from '../Components/MainPage';

import {
  GET_MY_COURSES_SUCCESS,
  GET_MY_COURSES_ERROR,
} from '../Components/Actions/GetMyCourses';
  
import {
  GET_TEACHING_COURSES_SUCCESS,
  GET_TEACHING_COURSES_ERROR,
} from '../Components/Actions/GetTeachingCourses';

  const initialState = {
    coursesMyList: [],
    coursesList: [],
    coursesTeachingList: [],
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
      case GET_MY_COURSES_SUCCESS:
          return {
            ...state,
            coursesMyList: action.payload,
          };
      case GET_TEACHING_COURSES_SUCCESS:
            return {
              ...state,
              coursesTeachingList: action.payload,
            };
      case GET_COURSES_ERROR:
        return {
          ...state,
          error: action.payload,
        };
        case GET_MY_COURSES_ERROR:
          return {
            ...state,
            error: action.payload,
          };
          case GET_TEACHING_COURSES_ERROR:
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
  