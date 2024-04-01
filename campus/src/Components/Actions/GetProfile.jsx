import axios from 'axios';

export const PROFILE_LOADED = 'PROFILE_LOADED';
export const PROFILE_ERROR = 'PROFILE_ERROR';
export const loadProfileData = () => async (dispatch) => {
  try {
    const response = await axios.get('https://camp-courses.api.kreosoft.space/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log('profile');
    console.log(response);
    dispatch({
      type: PROFILE_LOADED,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: PROFILE_ERROR, payload: error.message });
  }
};