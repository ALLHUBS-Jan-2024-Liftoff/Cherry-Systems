import { createContext, useEffect, useState, useContext } from "react";
import { getCurrentUser, login as authLogin, logout as authLogout, isAuthenticated } from "../service/AuthService";
import { useNavigate } from "react-router-dom";
import Login from "../components/pages/Login";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);

    const handleLogin = async (username, email, password) => {
        try {
            const user = await authLogin(username, email, password);
            setUser(user);
        } catch (error) {
            console.error('Failed to login!', error);
            throw error;
        }
    };

    const handleLogout = () => {
        authLogout();
        setUser(null);
        navigate(<Login/>);
    };

    return(
        <AuthContext.Provider 
            value={{ 
            user,
            login: handleLogin,
            logout: handleLogout,
            isAuthenticated: isAuthenticated()
            }}
        >
            { children }
        </AuthContext.Provider>
    );
};

export default AuthContext;