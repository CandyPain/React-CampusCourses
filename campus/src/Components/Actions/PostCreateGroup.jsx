import axios from 'axios';
import {fetchGroups} from './GetGroups'

export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
export const CREATE_GROUP_FAILURE = 'CREATE_GROUP_FAILURE';

export const createGroup = (newName) => async (dispatch) => {
  try {
    const response = await axios.post(`https://camp-courses.api.kreosoft.space/groups`, { name: newName },   
    {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }});
    dispatch({ type: CREATE_GROUP_SUCCESS, payload: response.data });
    dispatch(fetchGroups());
  } catch (error) {
    dispatch({ type: CREATE_GROUP_FAILURE, payload: error.message });
  }
};
