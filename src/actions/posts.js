import { UPDATE_POSTS } from './actionTypes';
import { APIUrls } from '../helpers/urls';

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
