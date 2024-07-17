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

            {/* <li className="nav-item">
                <Link to='/Login' className="nav-item">Login</Link>
            </li> */}
            
            <button className="navbar-button">Sign Up</button>

        </ul>

        </div>

    )
}