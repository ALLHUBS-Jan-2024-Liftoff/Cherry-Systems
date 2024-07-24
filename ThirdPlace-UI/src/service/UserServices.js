import axios from "axios";

const BASEAPIURL = "http://localhost:8080/api/user";

//For authorized admin
//Will refactor for better security later
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${BASEAPIURL}/all`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching all Users!", error);
    throw error;
  }
};

export const addUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${BASEAPIURL}/registration`, null, {
      params: { username, password, email },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error creating the User!", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.post(`${BASEAPIURL}/delete`, null, {
      params: { userId },
    });
  } catch (error) {
    console.error("There was an error deleting the User!", error);
    throw error;
  }
};
