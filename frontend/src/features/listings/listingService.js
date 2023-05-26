import axios from "axios";
import Cookies from "js-cookie";

//creates new listing, stores info in mongodb
//API routes are kept internally within functions.
const createListing = async (listingData) => {
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post("/api/listing/new", listingData, config);
  return response.data;
};

//get listings only specific to the logged in business
const getBusinessListings = async () => {
  const token = Cookies.get("token");
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

const editSpecificListing = async (listingId, listingData) => {
  const token = Cookies.get("token");
  const url = `/api/listing/${listingId}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(url, listingData, config);
  return response.data;
};

//searching listings takes into account the search params.
// A use effect on the listingsPage should dispatch this if it detects any params.
export const searchListings = async (searchParams) => {
  const { latitude, longitude, distance, query, limit, page } = searchParams;

  //If users just search by key word
  //I dont thick this is required due to backend filtering.
  if (!latitude && !longitude) {
    try {
      const response = await axios.get(
        `/api/listing/search?distance=${distance}&query=${query}&page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error searching listings");
    }
  }

  //for all other querys, add in full params.
  try {
    const response = await axios.get(
      `/api/listing/search?latitude=${latitude}&longitude=${longitude}&distance=${distance}&query=${query}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error searching listings");
  }
};

const deleteSpecificListing = async (listingId, businessId) => {
  let id = listingId;
  const token = Cookies.get("token");
  const url = `/api/listing/${id}?business=${businessId}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(url, config);
  return response.data;
};

const listingService = {
  createListing,
  getBusinessListings,
  getAllListings,
  getSpecificListing,
  editSpecificListing,
  searchListings,
  deleteSpecificListing,
};

export default listingService;
