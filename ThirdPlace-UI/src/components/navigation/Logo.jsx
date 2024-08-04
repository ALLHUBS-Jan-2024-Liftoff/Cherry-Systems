import { Link } from "react-router-dom"
import navlogo from "../../assets/logo-with-type.png"
import { useAuth } from "../../context/AuthContext"

export default function Logo() {
    const { user, isAuthenticated } = useAuth


    return (
       
        <Link to="/" state={{ user, isAuthenticated }} className="navbar-brand" id="logoimg">
        <img src={navlogo} className="d-inline-block align-top"/>
        </Link>
    
    )
}