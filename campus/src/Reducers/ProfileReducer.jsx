import {  PROFILE_LOADED, PROFILE_ERROR } from '../Components/Actions/GetProfile';
import {  PROFILE_EDIT_SUCCESS, PROFILE_EDIT_ERROR } from '../Components/Actions/PutProfile';

const initialState = {
  fullName: '',
  email: '',
  birthDate: '',
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADED:
      const formattedBirthDate = new Date(action.payload.birthDate).toISOString().split('T')[0];
      return {
        ...state,
        fullName: action.payload.fullName,
        email: action.payload.email,
        birthDate: formattedBirthDate,
        error: null,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
      case PROFILE_EDIT_SUCCESS:
        console.log(PROFILE_EDIT_SUCCESS);
        return {
          ...state,
          fullName: action.payload.fullName,
          email: action.payload.email,
          birthDate: formattedBirthDate,
          error: null,
        };
      case PROFILE_EDIT_ERROR:
        return {
          ...state,
          error: action.payload,
        };
    default:
      return state;
  }
};

export default profileReducer;
