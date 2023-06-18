import axios from "axios";
import Cookies from "js-cookie";

//API endpoint fo registering user accounts
const API_URL = "/api/business";

//register business

const registerBusiness = async (businessData) => {
  const response = await axios.post("/api/business", businessData);

  localStorage.removeItem("business");
  localStorage.removeItem("user");

  if (response.data) {
    localStorage.setItem("business", JSON.stringify(response.data));
  }

  return response.data;
};

//login business
//public route for logging in.
const loginBusiness = async (businessData) => {
  const LOGIN_URL = "/api/business/login";

  const response = await axios.post(LOGIN_URL, businessData);
  /* @ToDo - change for cookies when going live. */
  if (response.data) {
    localStorage.setItem("business", JSON.stringify(response.data));
  }
  return response.data;
};

const getBusiness = async () => {
  const token = Cookies.get("token");
  const url = "/api/business/profile";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(url, config);
  if (response.data) {
    localStorage.setItem("business", JSON.stringify(response.data));
  }
  return response.data;
};

const logoutBusiness = async () => {
  const API_LOGOUT = "/api/business/logout";
  const response = await axios.post(API_LOGOUT);

  if (response.data) {
    localStorage.removeItem("business");
    return response;
  }
};

const deleteBusiness = async () => {
  const token = Cookies.get("token");
  const url = `/api/business/profile`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(url, config);
  if (response.status === 202) {
    localStorage.removeItem("business");
  }
  return response.data;
};

const businessService = {
  registerBusiness,
  loginBusiness,
  logoutBusiness,
  deleteBusiness,
  getBusiness,
};

export default businessService;
