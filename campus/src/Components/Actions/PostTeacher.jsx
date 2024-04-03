import axios from 'axios';
import {fetchCourseDetails} from './GetDetails'

export const CREATE_TEACHER_SUCCESS = 'CREATE_TEACHER_SUCCESS';
export const CREATE_TEACHER_FAILURE = 'CREATE_TEACHER_FAILURE';

export const createTeacher = (courseId,id) => async (dispatch) => {
  try {
    const response = await axios.post(`https://camp-courses.api.kreosoft.space/courses/${courseId}/teachers`, { userId: id },   
    {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }});
    dispatch({ type: CREATE_TEACHER_SUCCESS, payload: response.data });
    dispatch(fetchCourseDetails(courseId));
  } catch (error) {
    dispatch({ type: CREATE_TEACHER_FAILURE, payload: error.message });
  }
};
