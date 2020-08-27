import {
  UPDATE_POSTS,
  ADD_POST,
  ADD_COMMENT,
  UPDATE_POST_LIKE,
} from './actionTypes';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';

export function fetchPosts() {
  return (dispatch) => {
    // const url = 'http://codeial.com:8000/api/v2/posts?page=1&limit=5';
    const url = APIUrls.fetchPosts(); // Url become Dynamic
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(updatePosts(data.data.posts));
      });
  };
}

// To update the posts
export const updatePosts = (posts) => {
  return {
    type: UPDATE_POSTS,
    posts: posts,
  };
};

// Add post
export const addPost = (post) => {
  return {
    type: ADD_POST,
    post,
  };
};

export function createPost(content) {
  return (dispatch) => {
    const url = APIUrls.createPost();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Post Data', data);
        if (data.success) {
          dispatch(addPost(data.data.post)); // Check in API
          return;
        }
      });
  };
}

// Add Comment
export function createComment(content, postId) {
  return (dispatch) => {
    const url = APIUrls.createComment();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content, post_id: postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addComment(data.data.comment, postId));
        }
      });
  };
}

export function addComment(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment,
    postId,
  };
}

// Like a post
export function addLike(id, likeType, userId) {
  //likeType means may be post or comment
  return (dispatch) => {
    const url = APIUrls.toggleLike(id, likeType);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Our API is written in "urlencoded" if our API is written in JSON then you don't need to specify 'Content-Type' (you can specify but not compulsory).
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Like Data', data);
        if (data.success) {
          dispatch(addLikesToStore(id, userId));
        }
      });
  };
}
export function addLikesToStore(postId, userId) {
  return {
    type: UPDATE_POST_LIKE,
    postId,
    userId,
  };
}
