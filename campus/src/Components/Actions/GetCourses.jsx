import axios from 'axios';

export const GET_COURSES_SUCCESS = 'GET_COURSES_SUCCESS';
export const GET_COURSES_ERROR = 'GET_COURSES_ERROR';
export const SET_GROUP_ID = 'SET_GROUP_ID'

export const getCourses = (groupId) => async (dispatch) => {
  try {
    console.log(groupId);
    console.log('GET COURSES START');
    const response = await axios.get(`https://camp-courses.api.kreosoft.space/groups/${groupId}`,{headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }});
    console.log("GET COURSES END");
    console.log(response);
    dispatch({
      type: GET_COURSES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log('error GetCourses')
    dispatch({
      type: GET_COURSES_ERROR,
      payload: error.message,
    });
  }
};
