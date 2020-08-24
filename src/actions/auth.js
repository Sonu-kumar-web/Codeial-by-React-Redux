import { LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS } from './actionTypes';
import { APIUrls } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}

export function loginSuccess({ user }) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function login(email, password) {
  // this action is Asynchronous so we have to use "thunk"
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    // By default the fetch request is 'get' one
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-ww-form-urlencoded', // Our API is written in "urlencoded" if our API is written in JSON then you don't need to specify 'Content-Type' (you can specify but not compulsory).
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data', data);
        if (data.success) {
          // dispatch action to save user
          dispatch(loginSuccess(data.data.user));
          return;
        }
        // If not success
        dispatch(loginFailed(data.message));
      });
  };
}
