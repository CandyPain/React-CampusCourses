// actions/groupsActions.js

import axios from 'axios';
export const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS';
export const FETCH_GROUPS_FAILURE = 'FETCH_GROUPS_FAILURE';

export const fetchGroupsSuccess = (groups) => ({
  type: FETCH_GROUPS_SUCCESS,
  payload: groups,
});

export const fetchGroupsFailure = (error) => ({
  type: FETCH_GROUPS_FAILURE,
  payload: error,
});

export const fetchGroups = () => async (dispatch) => {
  try {
    const response = await axios.get('https://camp-courses.api.kreosoft.space/groups', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('GROUP');
      console.log(response);
    dispatch(fetchGroupsSuccess(response.data));
  } catch (error) {
    dispatch(fetchGroupsFailure(error.message));
  }
};
