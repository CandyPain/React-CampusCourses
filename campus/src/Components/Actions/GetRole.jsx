
import axios from 'axios';
export const FETCH_ROLE_SUCCESS = 'FETCH_ROLE_SUCCESS';
export const FETCH_ROLE_FAILURE = 'FETCH_ROLE_FAILURE';

export const fetchRoleSuccess = (role) => ({
  type: FETCH_ROLE_SUCCESS,
  payload: role,
});

export const fetchRoleFailure = (error) => ({
  type: FETCH_ROLE_FAILURE,
  payload: error,
});

export const fetchRole = () => async (dispatch) => {
  try {
    const response = await axios.get('https://camp-courses.api.kreosoft.space/roles', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('ROLE');
      console.log(response);
    dispatch(fetchRoleSuccess(response.data));
  } catch (error) {
    dispatch(fetchRoleFailure(error.message));
  }
};
