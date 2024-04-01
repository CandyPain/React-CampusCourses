import axios from 'axios';
import {fetchCourseDetails} from './GetDetails'

export const ACCEPT_COURSE_SUCCESS = 'ACCEPT_COURSE_SUCCESS';
export const ACCEPT_COURSE_FAILURE = 'ACCEPT_COURSE_FAILURE';

export const acceptCourse = (courseId) => async (dispatch) => {
  try {
    console.log(courseId, localStorage.getItem('token'));
    const response = await axios.post(`https://camp-courses.api.kreosoft.space/courses/${courseId}/sign-up`,{data: ''},
    {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }});
      console.log('acceptCourseSucess');
    dispatch({ type: ACCEPT_COURSE_SUCCESS, payload: response.data });
    dispatch(fetchCourseDetails(courseId));
  } catch (error) {
    console.log(error);
    dispatch({ type: ACCEPT_COURSE_FAILURE, payload: error.message });
  }
};
