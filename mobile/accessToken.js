let accessToken = '';
let userId = '';

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => {
  return accessToken;
};

export const setUserId = (user) => {
  userId = user;
};

export const getUserId = () => {
  return userId;
};
