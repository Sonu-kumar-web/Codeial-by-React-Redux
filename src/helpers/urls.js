// This will file contain all the URLs
// Follow DRY (Don't Repeat Yourself) property.
const API_Root = 'http://codeial.com:8000/api/v2';

export const APIUrls = {
  login: () => `${API_Root}/users/login`,
  signup: () => `${API_Root}/users/signup`,
  editProfile: () => `${API_Root}/users/edit`,
  fetchPosts: (page = 1, limit = 20) =>
    `${API_Root}/posts?page=${page}&limit=${limit}`,
  userProfile: (userId) => `${API_Root}/users/${userId}`,
  userFriends: () => `${API_Root}/friendship/fetch_user_friends`,
  addFriend: (userId) =>
    `${API_Root}/friendship/create_friendship?user_id=${userId}`,
  removeFriend: (userId) =>
    `${API_Root}/friendship/remove_friendship?user_id=${userId}`,
  createPost: () => `${API_Root}/posts/create`,
  createComment: () => `${API_Root}/comments/`,
  toggleLike: (id, likeType) =>
    `${API_Root}/likes/toggle?likeable_id=${id}&likeable_type=${likeType}`,
};
