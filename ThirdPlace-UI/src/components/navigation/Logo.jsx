import navlogo from "../../assets/logo-with-type.png"

export default function Logo() {
    return (
       
        <a href="/" className="navbar-brand" id="logoimg">
        <img src={navlogo} className="d-inline-block align-top"/>
        </a>
    
    )
}