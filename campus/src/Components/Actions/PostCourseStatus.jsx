import axios from 'axios';
import {fetchCourseDetails} from './GetDetails'

export const STATUS_CHANGE_SUCCESS = 'STATUS_CHANGE_SUCCESS';
export const STATUS_CHANGE_FAILURE = 'STATUS_CHANGE_FAILURE';

export const statusChange = (courseId,courseInfo) => async (dispatch) => {
  try {
    const response = await axios.post(`https://camp-courses.api.kreosoft.space/courses/${courseId}/status`, courseInfo,   
    {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }});
    dispatch({ type: STATUS_CHANGE_SUCCESS, payload: response.data });
    dispatch(fetchCourseDetails(courseId));
  } catch (error) {
    console.log(error);
    dispatch({ type: STATUS_CHANGE_FAILURE, payload: error.message });
  }
};
