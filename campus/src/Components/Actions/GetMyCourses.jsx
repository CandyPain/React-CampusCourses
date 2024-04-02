import axios from 'axios';

export const GET_MY_COURSES_SUCCESS = 'GET_MY_COURSES_SUCCESS';
export const GET_MY_COURSES_ERROR = 'GET_MY_COURSES_ERROR';
export const SET_GROUP_ID = 'SET_GROUP_ID'

export const getMyCourses = () => async (dispatch) => {
  try {
    const response = await axios.get(`https://camp-courses.api.kreosoft.space/courses/my`,{headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }});
    console.log("GET COURSES");
    console.log(response);
    dispatch({
      type: GET_MY_COURSES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log('error GetCourses')
    dispatch({
      type: GET_MY_COURSES_ERROR,
      payload: error.message,
    });
  }
};
