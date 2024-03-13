const initialState = {
  token: null,
  isAuthenticated: false,
  userEmail: '',
};
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
        return {
          ...state,
          token: action.payload,
          isAuthenticated: true,
          userEmail: action.payload,
        };
        case 'REGISTER_SUCCESS':
          return {
            ...state,
            token: action.payload,
            isAuthenticated: true,
            userEmail: action.payload,
          };
        case 'LOGOUT':
          return {
            ...state,
            token: null,
            isAuthenticated: false,
            userEmail: '',
          };
      default:
        return state;
    }
  };
  
  export default reducer;