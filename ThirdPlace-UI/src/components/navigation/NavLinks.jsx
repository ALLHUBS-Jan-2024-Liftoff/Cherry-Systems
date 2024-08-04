import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function NavLinks() {
    const { user, isAuthenticated } = useAuth();

    return (

        <div id="navbarText">

        <ul className="navbar-nav me-auto mb-2 mb-lg-0 p-1">

            <li className="nav-item">
            <Link to={{ pathname: '/SearchAndList', state: { user, isAuthenticated }}} className="nav-item">View Locations</Link>
            </li>

            <li className="nav-item">
                <Link to={{ pathname: '/SubmitLocation', state: { user, isAuthenticated }}} className="nav-item">Submit Location</Link>
            </li>

            <li className="nav-item">
                <Link to={{ pathname: '/login', state: { user, isAuthenticated }}} className="nav-item">Login</Link>
            </li> 
            
            <Link to={{ pathname: '/Registration', state: { user, isAuthenticated }}}>
                <button className="navbar-button">Sign Up</button>
            </Link>

        </ul>

        </div>

    )
}