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
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });
        const { token, user } = response.data;
        
        // Log entire response object
        console.log("Login Response: ", response.data, response.status, user);
        
        return user;
    } catch (error) {
        const errorData = error.response.data;
        let allDefaultMessages = [];

        // Add all "defaultMessage" from error response to empty array to be logged in console
        for (let i = 0; i < errorData.length; i++) {  
        allDefaultMessages.push(errorData[i].defaultMessage);
    }

        console.error("Error logging in user!", allDefaultMessages);
    throw error;
    }

};

export const getCurrentUser = async () => {
    try {
        const response = await axios.get (`${BASEAPIURL}/currentUser`, {}, { 
            withCredentials: true 
        });
        
        return response.data;
    } catch (error) {
        console.error('No authorized user!', error);
        throw error;
    };
};

export const isAuthenticated = () => {
    // Add code to authenticate user
};

export const logout = async () => {
    try {
        const response = await axios.post(`@{BASEAPIURL}/logout`, {}, { 
            withCredentials: true 
        });
        return response.data;
    } catch (error) {
        console.error('Failed to logout!', error);
        throw error;
    };
};