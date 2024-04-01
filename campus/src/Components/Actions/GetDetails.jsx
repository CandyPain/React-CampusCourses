import axios from 'axios';
export const FETCH_COURSE_DETAILS_REQUEST = 'FETCH_COURSE_DETAILS_REQUEST';
export const FETCH_COURSE_DETAILS_SUCCESS = 'FETCH_COURSE_DETAILS_SUCCESS';
export const FETCH_COURSE_DETAILS_FAILURE = 'FETCH_COURSE_DETAILS_FAILURE';

export const fetchCourseDetails = (courseId) => async (dispatch) => {
  dispatch({ type: FETCH_COURSE_DETAILS_REQUEST });
  try {
    console.log('courseId', courseId);
    const response = await axios.get(`https://camp-courses.api.kreosoft.space/courses/${courseId}/details`,{headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }});
    console.log(response);
    dispatch({ type: FETCH_COURSE_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_COURSE_DETAILS_FAILURE, payload: error.message });
  }
};
