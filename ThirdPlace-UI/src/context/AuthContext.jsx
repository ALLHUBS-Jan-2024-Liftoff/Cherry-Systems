import { createContext, useEffect, useState, useContext } from "react";
import { getCurrentUser, login as authLogin, logout as authLogout } from "../service/AuthService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(sessionStorage.getItem("user") || null);
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("isAuthenticated") || false);
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("isAuthenticated", isAuthenticated);

    const checkAuthUser = async () => {
        try {
            const currentUser = await getCurrentUser();
            if (currentUser) {
                setUser(currentUser);
                console.log(currentUser);
                setIsAuthenticated(true);
                console.log(`Authenticated: ${isAuthenticated}`);
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
            setIsAuthenticated(true); // reaches here but doesn't
            console.log(`Authenticated: ${isAuthenticated}`);
            // window. location. reload();
        } catch (error) {
            console.error('Failed to login!', error);
            throw error;
        }
    };

    const handleLogout = async () => {
        try {
            await authLogout();
            setUser(null);
            console.log("log in auth context handleLogout");
            setIsAuthenticated(false);
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("isAuthenticated");
            // sessionStorage.clear();
            // window. location. reload();
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