import { createContext, useEffect, useState, useContext } from "react";
import { getCurrentUser, login as authLogin, logout as authLogout } from "../service/AuthService";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuthUser = async () => {
        try {
            const currentUser = await getCurrentUser();
            if (currentUser) {
                setUser(currentUser);
                setIsAuthenticated(true);
                console.log('Current User: ' + currentUser.username);
                // console.log('Authenticated: ' + isAuthenticated); // state is not true when browser component shows true; test later
            }
        } catch (error) {
            setUser(null);
        }
    };
    
    useEffect(() => {
        checkAuthUser();
    }, []);

    const handleLogin = async (username, email, password) => {
        try {
            const loginStatus = await authLogin(username, email, password);
            setIsAuthenticated(true);
            // console.log(`Authenticated: ${isAuthenticated}`); // false when context shows true, test later
        } catch (error) {
            console.error('Failed to login!', error);
            throw error;
        }
    };

    const handleLogout = async () => {
        try {
            await authLogout();
            setUser(null);
            setIsAuthenticated(false);
            // console.log(`Authenticated: ${isAuthenticated}`); // state is not true when browser component shows true; test later
        } catch (error) {
            console.error('Failed to logout!', error);
            throw error;
        }
    };

    return(
        <AuthContext.Provider 
            value={{ 
            user,
            login: handleLogin,
            logout: handleLogout,
            isAuthenticated
            }}
        >
            { children }
        </AuthContext.Provider>
    );
};

export default AuthContext;