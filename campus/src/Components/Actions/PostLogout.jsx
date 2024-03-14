import axios from 'axios';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const logOut = () => async (dispatch) => {
  try {
    await axios.put('https://camp-courses.api.kreosoft.space/logout',{
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});
localStorage.removeItem('token');
    dispatch({
      type: LOGOUT_SUCCESS,
    });

  } catch (error) {
    dispatch({ type: LOGOUT_ERROR, payload: error.message });
  }
};