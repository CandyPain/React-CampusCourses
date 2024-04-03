import axios from 'axios';
import {fetchCourseDetails} from './GetDetails'

export const EDIT_COURSE_SUCCESS = 'EDIT_COURSE_SUCCESS';
export const EDIT_COURSE_FAILURE = 'EDIT_COURSE_FAILURE';

export const editCourse = (courseId,courseInfo) => async (dispatch) => {
  try {
    const response = await axios.put(`https://camp-courses.api.kreosoft.space/courses/${courseId}`, courseInfo,   
    {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }});
    dispatch({ type: EDIT_COURSE_SUCCESS, payload: response.data });
    dispatch(fetchCourseDetails(courseId));
  } catch (error) {
    console.log(error);
    dispatch({ type: EDIT_COURSE_FAILURE, payload: error.message });
  }
};


export const editCourseTeacher = (courseId,courseInfo) => async (dispatch) => {
  try {
    const response = await axios.put(`https://camp-courses.api.kreosoft.space/courses/${courseId}/requirements-and-annotations`, courseInfo,   
    {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }});
    dispatch({ type: EDIT_COURSE_SUCCESS, payload: response.data });
    dispatch(fetchCourseDetails(courseId));
  } catch (error) {
    console.log(error);
    dispatch({ type: EDIT_COURSE_FAILURE, payload: error.message });
  }
};
