import axios from "axios";

const BASEAPIURL = "http://localhost:8080/api/user";

export const login = async (username, email, password) => {
    const userData = {
        username,
        email,
        password
    };

    try {
        const response = await axios.post(`${BASEAPIURL}/login`, userData, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
    });
        // Log entire response object
        console.log("Login Response: ", response.data, response.status);
        
        return response.data;
    } catch (error) {
        const errorData = error.response.data;
        let allDefaultMessages = [];

        // Add all "defaultMessage" from error response to empty array to be logged in console
        for (let i = 0; i < errorData.length; i++) {  
        allDefaultMessages.push(errorData[i].defaultMessage);
    }

        console.error("Error logging in user!", allDefaultMessages);
    throw error;
    };

};

export const getCurrentUser = async () => {
    try {
        const response = await axios.get (`${BASEAPIURL}/currentUser`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        const user = response.data;

        return user;
    } catch (error) {
        console.error('No current user found!', error);
        return null;
    };
};

export const logout = async () => {
    try {
        const response = await axios.get(`@{BASEAPIURL}/logout`, {}, { 
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        });

        console.log(response);
        
        return response.data;
    } catch (error) {
        console.error('Failed to logout!', error);
        throw error;
    };
};