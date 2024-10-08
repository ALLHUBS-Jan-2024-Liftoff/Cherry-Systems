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

// Fetch user by Username
export const getUserByUsername = async (username) => {
  try {
      const response = await axios.get (`${BASEAPIURL}/${username}`, {
        params: { username }
      });
      const user = response.data;

      return user;
  } catch (error) {
    const errorData = error.response.data;
    let allDefaultMessages = [];

    // Add all "defaultMessage" from error response to empty array to be logged in console
    for (let i = 0; i < errorData.length; i++) {  
      allDefaultMessages.push(errorData[i].defaultMessage);
    }

    console.error("Error fetching user!", allDefaultMessages);
    throw error;
      // return null;
  };
};


export const registerUser = async (username, email, verifyEmail, password, verifyPassword) => {
  const userData = {
    username,
    email,
    verifyEmail,
    password,
    verifyPassword
  };

  try {
    const response = await axios.post(`${BASEAPIURL}/registration`, userData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    console.log("Registration Response: ", response.data, response.status);
    return response.data;
  } catch (error) {
    const errorData = error.response.data;
    let allDefaultMessages = [];

    // Add all "defaultMessage" from error response to empty array to be logged in console
    for (let i = 0; i < errorData.length; i++) {  
      allDefaultMessages.push(errorData[i].defaultMessage);
    }

    console.error("Error registering new user!", allDefaultMessages);
    throw error;
  }
};

export const updateUser = async (username, email, verifyEmail, password, verifyPassword, profileImage) => {
  const userData = {
    username,
    email,
    verifyEmail,
    password,
    verifyPassword,
    profileImage
  };

  try {
    const response = await axios.patch(`${BASEAPIURL}/update`, userData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    console.log("Registration Response: ", response.data, response.status);
    return response.data;
  } catch (error) {
    const errorData = error.response.data;
    let allDefaultMessages = [];

    // Add all "defaultMessage" from error response to empty array to be logged in console
    for (let i = 0; i < errorData.length; i++) {  
      allDefaultMessages.push(errorData[i].defaultMessage);

      alert(errorData[i].defaultMessage);
    }

    console.error("Error updating current user!", allDefaultMessages);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.post(`${BASEAPIURL}/delete`, null, {
      params: { userId },
      withCredentials: true
    });
  } catch (error) {
    console.error("There was an error deleting the User!", error);
    throw error;
  }
};
