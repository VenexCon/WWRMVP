import axios from "axios";
import businessSlice from "./businessSlice";

//API endpoint fo registering user accounts
const API_URL = "/business";

//register business

const registerBusiness = async (businessData) => {
  const response = await axios.post(API_URL, businessData);

  if (response.data) {
    localStorage.setItem("business", JSON.stringify(response.data));
  }

  return response.data;
};

//login business
//public route for logging in.
const loginBusiness = async (businessData) => {
  const LOGIN_URL = "business/login";

  const response = await axios.post(LOGIN_URL, businessData);
  /* @ToDo - change for cookies when going live. */
  if (response) {
    localStorage.setItem("business", JSON.stringify(response.data));
  }
};

const logout = () => {
  localStorage.removeItem("business");
};

const businessService = {
  registerBusiness,
  loginBusiness,
  logout,
};

export default businessService;
