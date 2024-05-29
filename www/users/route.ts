import axios from "axios";

const RNM_API = "https://rickandmortyapi.com/api/character";

export const fetchUserInformation = async () => {
  try {
    const response = await axios.get(RNM_API);
    return response.data.results;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
