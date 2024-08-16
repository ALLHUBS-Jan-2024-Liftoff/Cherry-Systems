import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function NavLinks() {
    const { user, isAuthenticated, logout } = useAuth();

    const handleSubmit = async () => {
        await logout();
        alert("You have logged out!");
    }; 

    return (

        <div id="navbarText">

        <ul className="navbar-nav me-auto mb-2 mb-lg-0 p-1">

            {!user ? (
                <>
                    <li className="nav-item">
                        <Link to={{ pathname: '/SearchAndList', state: { user, isAuthenticated }}} className="nav-item">View Locations</Link>
                    </li>

                    <li className="nav-item">
                        <Link to={{ pathname: '/login', state: { user, isAuthenticated }}} className="nav-item">Login</Link>
                    </li>
                    
                    <Link to={{ pathname: '/Registration', state: { user, isAuthenticated }}}>
                        <button className="navbar-button">Sign Up</button>
                    </Link> 
                </>
            ) : (
                <>
                    <li className="nav-item">
                        <Link to={{ pathname: '/SearchAndList', state: { user, isAuthenticated }}} className="nav-item">View Locations</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={{ pathname: '/submission/submitlocation', state: { user, isAuthenticated }}} className="nav-item">Submit Location</Link>
                    </li>

                    <li className="nav-item">
                        <Link to={{ pathname: '/profile', state: { user, isAuthenticated }}} className="nav-item">{user.username}'s Profile</Link>
                    </li>

                    <Link to={{ pathname: '/', state: { user, isAuthenticated }}}>
                        <button className="navbar-button" onClick={handleSubmit}>Logout</button>
                    </Link>
                </>
            )}

        </ul>

        </div>

    )
}