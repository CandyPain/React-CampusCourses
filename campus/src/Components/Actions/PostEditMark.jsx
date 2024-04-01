import axios from 'axios';
import {fetchCourseDetails} from './GetDetails'

export const EDIT_STUDENT_MARK_SUCCESS = 'EDIT_STUDENT_MARK_SUCCESS';
export const EDIT_STUDENT_MARK_FAILURE = 'EDIT_STUDENT_MARK_FAILURE';

export const editStudentMark= (courseId, studentId, data) => async (dispatch) => {
  try {
    console.log('data',data);
    const response = await axios.post(`https://camp-courses.api.kreosoft.space/courses/${courseId}/marks/${studentId}`,data,
    {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }});
      console.log('acceptCourseSucess');
    dispatch({ type: EDIT_STUDENT_MARK_SUCCESS, payload: response.data });
    dispatch(fetchCourseDetails(courseId));
  } catch (error) {
    console.log(error);
    dispatch({ type: EDIT_STUDENT_MARK_FAILURE, payload: error.message });
  }
};
