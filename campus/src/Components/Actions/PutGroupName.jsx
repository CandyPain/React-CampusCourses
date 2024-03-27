import axios from 'axios';
import {fetchGroups} from './GetGroups'

export const EDIT_GROUP_SUCCESS = 'EDIT_GROUP_SUCCESS';
export const EDIT_GROUP_FAILURE = 'EDIT_GROUP_FAILURE';

export const editGroup = (groupId, newName) => async (dispatch) => {
  try {
    console.log('groupdId' + groupId);
    console.log(groupId);
    const response = await axios.put(`https://camp-courses.api.kreosoft.space/groups/${groupId}`, { name: newName },   
    {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }});
    console.log(response);
    dispatch({ type: EDIT_GROUP_SUCCESS, payload: response.data });
    dispatch(fetchGroups());
  } catch (error) {
    dispatch({ type: EDIT_GROUP_FAILURE, payload: error.message });
  }
};
