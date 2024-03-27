import axios from 'axios';
import {fetchGroups} from './GetGroups'

export const DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS';
export const DELETE_GROUP_FAILURE = 'DELETE_GROUP_FAILURE';

export const deleteGroup = (groupId) => async (dispatch) => {
  try {
    console.log('deleteGroup');
    console.log(groupId);
    const response = await axios.delete(`https://camp-courses.api.kreosoft.space/groups/${groupId}`,   
    {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }});
    console.log(response);
    dispatch({ type: DELETE_GROUP_SUCCESS, payload: response.data });
    dispatch(fetchGroups());
  } catch (error) {
    dispatch({ type: DELETE_GROUP_FAILURE, payload: error.message });
  }
};
