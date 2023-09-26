export const setToken = token => {
  localStorage.setItem('token', token);
};

export const getTokenFromLS = () => {
  let token = '';
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  }
  return token;
};

export const deleteToken = () => {
  localStorage.removeItem('token');
};
