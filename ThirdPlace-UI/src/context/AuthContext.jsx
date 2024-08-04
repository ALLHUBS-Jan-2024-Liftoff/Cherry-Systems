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
                console.log(currentUser);
                // localStorage.setItem('user', user);
                setIsAuthenticated(true);
                console.log(`Authenticated: ${isAuthenticated}`);
                // localStorage.setItem('isAuthenticated', isAuthenticated);
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
            // console.log(loginStatus);
        } catch (error) {
            console.error('Failed to login!', error);
            throw error;
        }
    };

    const handleLogout = async () => {
        await authLogout();
        setUser(null);
        // localStorage.removeItem('user');
        setIsAuthenticated(false);
        // localStorage.removeItem('isAuthenticated');
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