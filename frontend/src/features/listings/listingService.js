import axios from "axios";

//creates new listing, stores info in mongodb
//API routes are kept internally within functions.
const createListing = async (token, listingData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post("/api/listing/new", listingData, config);
  return response.data;
};

//get listings only specific to the logged in business
const getBusinessListings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/listing/mylistings", config);
  return response.data;
};

//get every listing (current has a limit of 10)
const getAllListings = async () => {
  const response = await axios.get("/api/listing");
  return response.data;
};

const getSpecificListing = async (listingId) => {
  const url = "/api/listing/";
  const response = await axios.get(url + listingId);
  return response.data;
};

const editSpecificListing = async (listingId, listingData, token) => {
  const url = `/api/listing/${listingId}/edit`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(url, listingData, config);
  return response.data;
};

export const searchListings = async (searchParams) => {
  const { latitude, longitude, distance } = searchParams;
  try {
    const response = await axios.get(
      `/api/listing/search?latitude=${latitude}&longitude=${longitude}&distance=${distance}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error searching listings");
  }
};

const listingService = {
  createListing,
  getBusinessListings,
  getAllListings,
  getSpecificListing,
  editSpecificListing,
  searchListings,
};

export default listingService;
