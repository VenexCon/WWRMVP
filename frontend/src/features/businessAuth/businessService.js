import axios from "axios";

//API endpoint fo registering user accounts
const API_URL = "/business";

//register business

const registerbusiness = async (businessData) => {
  const response = await axios.post(API_URL, businessData);

  if (response.data) {
    localStorage.setItem("business", JSON.stringify(response.data));
  }

  return response.data;
};

const businessService = {
  registerbusiness,
};

export default businessService;
