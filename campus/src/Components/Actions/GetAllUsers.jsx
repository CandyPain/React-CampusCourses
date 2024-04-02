import axios from 'axios';

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_ERROR = 'GET_USERS_ERROR';

export const getUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(`https://camp-courses.api.kreosoft.space/users`,{headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }});
    //console.log('ALLUSERS', response);
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USERS_ERROR,
      payload: error.message,
    });
  }
};
 