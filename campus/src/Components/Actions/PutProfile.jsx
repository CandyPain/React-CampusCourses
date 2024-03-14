import axios from 'axios';

export const PROFILE_EDIT_SUCCESS = 'PROFILE_EDIT_SUCCESS';
export const PROFILE_EDIT_ERROR = 'PROFILE_EDIT_ERROR';
export const updateProfileData = (userData) => async (dispatch) => {
  try {
    await axios.put('https://camp-courses.api.kreosoft.space/profile', userData, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

    dispatch({
      type: PROFILE_EDIT_SUCCESS,
    });
  } catch (error) {
    dispatch({ type: PROFILE_EDIT_ERROR, payload: error.message });
  }
};