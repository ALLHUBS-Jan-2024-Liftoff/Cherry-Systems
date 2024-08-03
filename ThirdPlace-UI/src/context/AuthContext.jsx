import { createContext, useEffect, useState, useContext } from "react";
import { getCurrentUser, login as authLogin, logout as authLogout } from "../service/AuthService";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = async (username, email, password) => {
        try {
            const user = await authLogin(username, email, password);
            // setUser(user); //makes a "user2" for some reason
            setIsAuthenticated(true);
            console.log(user.username, user.email);
        } catch (error) {
            console.error('Failed to login!', error);
            throw error;
        }
    };

    const handleLogout = () => {
        authLogout();
        setUser(null);
        setIsAuthenticated(false);
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