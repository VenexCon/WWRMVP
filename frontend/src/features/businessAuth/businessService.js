import axios from "axios";

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

const logoutBusiness = () => {
  localStorage.removeItem("business");
};

const businessService = {
  registerBusiness,
  loginBusiness,
  logoutBusiness,
};

export default businessService;
