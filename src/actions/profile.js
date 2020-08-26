import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

import {
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE,
  FETCH_USER_PROFILE,
} from './actionTypes';

// Actions to show users profile

export function startUserProfileFetch(user) {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}

export function userProfileFailure(error) {
  return {
    type: USER_PROFILE_FAILURE,
    error,
  };
}

export function fetchUserProfile(userId) {
  return (dispatch) => {
    dispatch(startUserProfileFetch());
    const url = APIUrls.userProfile(userId);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Our API is written in "urlencoded" if our API is written in JSON then you don't need to specify 'Content-Type' (you can specify but not compulsory).
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`, // Only login user can see the user profile
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('profile data', data);
        if (data.success) {
          dispatch(userProfileSuccess(data.data.user));
          return;
        }
        dispatch(userProfileFailure(data.message));
      });
  };
}
