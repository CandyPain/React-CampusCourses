import axios from 'axios';

export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
        console.log('in action');
      const response = await axios.post('https://camp-courses.api.kreosoft.space/login', userData);
      console.log(response.data.token);
      localStorage.setItem('token', response.data.token);
      dispatch(loginSuccess(response.data.token));
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      if(error.response.status === 400)
      {
        alert('login failed: Bad Email or Password');
      }
      else{
        alert('login failed: Technical problems, try again later');
      }
    }
  };
};

export const loginSuccess = (token) => ({
  type: 'LOGIN_SUCCESS',
  payload: token
});