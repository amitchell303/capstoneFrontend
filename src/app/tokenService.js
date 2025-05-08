// stores token in client browser
export const storeToken = (state, { payload }) => {
  localStorage.setItem("token", payload.token)
};

// returns the user token in the client browser
export const getToken = () => {
  return localStorage.getItem("token");
};

// delete the user token in the client browser
export const deleteToken = () => {
  return localStorage.removeItem("token");
};