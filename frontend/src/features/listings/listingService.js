import axios from "axios";

//creates new listing, stores info in mongodb
const createListing = async (listingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post("/listing/new", listingData, config);
  return response.data;
};

//get listings only specific to the logged in business
const getBusinessListings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/listing/myListings", config);
  return response.data;
};

const listingService = {
  createListing,
  getBusinessListings,
};

export default listingService;
