import axios from "axios";

const createListing = async (listingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post("/listing/new", listingData, config);
  return response.data;
};

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
