import axios from "axios";
import Cookies from "js-cookie";

//register users

const register = async (userData) => {
  const response = await axios.post("/api/users", userData);

  Cookies.remove("token");

  localStorage.removeItem("user");
  localStorage.removeItem("business");

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//logs-in users
//public route
//will need to place token into cookies not frontend
const login = async (userData) => {
  const API_LOGIN = "/api/users/login";

  const response = await axios.post(API_LOGIN, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//get latest User
// private Route
//may need amending to ensure user.state is the latest user.
const getUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const API_USER = "/api/users/profile";
  const response = await axios.get(API_USER, config);
  return response.data;
};

//edits users
//private route
// place tokens not in the front end! This will edit the user
// currently the userProfile subscribes to this state, but the profile loads the user from LS, hence placing the object on LS is required.
const editUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const API_EDIT = "/api/users/profile";
  const response = await axios.put(API_EDIT, userData, config);
  if (!response.data.error)
    localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const logout = async () => {
  const API_LOGOUT = "/api/users/logout";
  const response = await axios.post(API_LOGOUT);

  if (response.data) {
    localStorage.removeItem("user");
    return response;
  }
};

const authService = {
  register,
  logout,
  login,
  editUser,
  getUser,
};

export default authService;
