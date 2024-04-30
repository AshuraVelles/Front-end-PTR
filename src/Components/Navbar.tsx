import './Navbar.css'


const Navbar = () => {

    return(
        <nav className="navbar">
            <a href="/" className="SiteTitle">RCA</a>
            <ul>
               <li> <a href="/login">Login</a> </li> 
               <li> <a href="/foundItems">Found Items</a></li>
            </ul>
        </nav>
    );

};


export default Navbar;