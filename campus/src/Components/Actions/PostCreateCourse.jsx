import axios from 'axios';
import {getCourses} from './GetCourses'

export const CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS';
export const CREATE_COURSE_FAILURE = 'CREATE_COURSE_FAILURE';

export const createCourse = (groupId,courseInfo) => async (dispatch) => {
  try {
    const response = await axios.post(`https://camp-courses.api.kreosoft.space/groups/${groupId}`, courseInfo,   
    {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }});
    dispatch({ type: CREATE_COURSE_SUCCESS, payload: response.data });
    dispatch(getCourses(groupId));
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_COURSE_FAILURE, payload: error.message });
  }
};
