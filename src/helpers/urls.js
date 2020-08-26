// This will file contain all the URLs
// Follow DRY (Don't Repeat Yourself) property.
const API_Root = 'http://codeial.com:8000/api/v2';

export const APIUrls = {
  login: () => `${API_Root}/users/login`,
  signup: () => `${API_Root}/users/signup`,
  editProfile: () => `${API_Root}/users/edit`,
  fetchPosts: (page = 1, limit = 5) =>
    `${API_Root}/posts?page=${page}&limit=${limit}`,
  userProfile: (userId) => `${API_Root}/users/${userId}`,
};
