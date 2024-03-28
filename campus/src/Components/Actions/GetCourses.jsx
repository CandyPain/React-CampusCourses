import axios from 'axios';

export const GET_COURSES_SUCCESS = 'GET_COURSES_SUCCESS';
export const GET_COURSES_ERROR = 'GET_COURSES_ERROR';

export const getCourses = (groupId) => async (dispatch) => {
  try {
    const response = await axios.get(`https://camp-courses.api.kreosoft.space/groups/${groupId}`);
    console.log("GET COURSES");
    console.log(response);
    dispatch({
      type: GET_COURSES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_COURSES_ERROR,
      payload: error.message,
    });
  }
};
