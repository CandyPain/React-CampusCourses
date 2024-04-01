import axios from 'axios';
import {fetchCourseDetails} from './GetDetails'

export const EDIT_STUDENT_STATUS_SUCCESS = 'EDIT_STUDENT_STATUS_SUCCESS';
export const EDIT_STUDENT_STATUS_FAILURE = 'EDIT_STUDENT_STATUS_FAILURE';

export const editStudentStatus = (courseId, studentId, data) => async (dispatch) => {
  try {
    console.log('data',data);
    const response = await axios.post(`https://camp-courses.api.kreosoft.space/courses/${courseId}/student-status/${studentId}`,data,
    {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }});
      console.log('acceptCourseSucess');
    dispatch({ type: EDIT_STUDENT_STATUS_SUCCESS, payload: response.data });
    dispatch(fetchCourseDetails(courseId));
  } catch (error) {
    console.log(error);
    dispatch({ type: EDIT_STUDENT_STATUS_FAILURE, payload: error.message });
  }
};
