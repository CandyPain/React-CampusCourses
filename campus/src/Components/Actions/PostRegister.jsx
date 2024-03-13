import axios from 'axios';

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
        console.log('in action');
      const response = await axios.post('https://camp-courses.api.kreosoft.space/registration', userData);
      console.log(response.data.token);
      localStorage.setItem('token', response.data.token);
      dispatch(registerSuccess(response.data.token));
    } catch (error) {
      console.log(error);
      alert('Registration failed:', error.message);
    }
  };
};

export const registerSuccess = (token) => ({
  type: 'REGISTER_SUCCESS',
  payload: token
});