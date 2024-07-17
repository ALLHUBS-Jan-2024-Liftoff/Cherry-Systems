import { NavLink, Link } from "react-router-dom";

export default function NavLinks() {

    return (

        <div id="navbarText">

        <ul className="navbar-nav me-auto mb-2 mb-lg-0 p-1">

            <li className="nav-item">
                View Locations
            </li>

            <li className="nav-item">
                Submit Location
            </li>

{/* Not sure if we should use NavLink or Link for these */}
            <li className="nav-item">
                <Link to='/Login'>Login</Link>
            </li>
            
{/* <a> tag reloads page, Link does not; could use onClick for this */}
            <a href='/Registration'>
            <button className="navbar-button">Sign Up</button>
            </a>

        </ul>

        </div>

    )
}