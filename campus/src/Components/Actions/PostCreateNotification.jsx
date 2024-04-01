import axios from 'axios';
import {fetchCourseDetails} from './GetDetails'

export const CREATE_NOTIFICATION_SUCCESS = 'CREATE_NOTIFICATION_SUCCESS';
export const CREATE_NOTIFICATION_FAILURE = 'CREATE_NOTIFICATION_FAILURE';

export const CreateNotification = (courseId,NotInfo) => async (dispatch) => {
  try {
    const response = await axios.post(`https://camp-courses.api.kreosoft.space/courses/${courseId}/notifications`, NotInfo,   
    {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }});
    dispatch({ type: CREATE_NOTIFICATION_SUCCESS, payload: response.data });
    dispatch(fetchCourseDetails(courseId));
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_NOTIFICATION_FAILURE, payload: error.message });
  }
};
