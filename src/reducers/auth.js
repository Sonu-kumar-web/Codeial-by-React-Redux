import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from '../actions/actionTypes';

const initialAuthState = {
  user: {},
  error: null,
  isLoggedIn: false,
  inProgress: false, // It is for disable or enable the Login button
};
export function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_SUCCESS: // Login success will gives JWT token
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
        error: null,
        inProgress: false, // Enable the login button
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false, // Enable the login button
      };
    default:
      return state;
  }
}
