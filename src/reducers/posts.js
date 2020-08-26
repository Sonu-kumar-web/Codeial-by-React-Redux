import { UPDATE_POSTS, ADD_POST } from '../actions/actionTypes';

export default function posts(state = [], action) {
  // {posts:[]}
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    case ADD_POST:
      return [
        action.post,
        ...state, //the new post will post at start and rest pst will be after that
      ];
    default:
      return state;
  }
}
