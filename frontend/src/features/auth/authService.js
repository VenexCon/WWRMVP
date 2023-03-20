import axios from "axios";

//API endpoint fo registering user accounts
const API_URL = "/users";

//register users

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//logs-in users
//public route
//will need to place token into cookies not frontend
const login = async (userData) => {
  const API_LOGIN = "/users/login";

  const response = await axios.post(API_LOGIN, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
