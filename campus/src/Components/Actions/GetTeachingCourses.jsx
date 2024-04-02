import axios from 'axios';

export const GET_TEACHING_COURSES_SUCCESS = 'GET_TEACHING_COURSES_SUCCESS';
export const GET_TEACHING_COURSES_ERROR = 'GET_TEACHING_COURSES_ERROR';
export const SET_GROUP_ID = 'SET_GROUP_ID'

export const getTeachingCourses = () => async (dispatch) => {
  try {
    const response = await axios.get(`https://camp-courses.api.kreosoft.space/courses/teaching`,{headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }});
    console.log("GET COURSES");
    console.log(response);
    dispatch({
      type: GET_TEACHING_COURSES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log('error GetCourses')
    dispatch({
      type: GET_TEACHING_COURSES_ERROR,
      payload: error.message,
    });
  }
};
