import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/logo.JPG';

function Nav() {


    let navStyle = {
        fontSize : '24px',
        fontWeight : 'bold',
        textDecoration: 'none'
      }

    return (
        <nav>
     
            <img style = {{height : '8.5vh'}} src = {logo} />
            <ul className="navlinks">
                 <Link style = {navStyle}  to = "/travel-app/Trips" > 
                <li> Trips</li>
                </Link>

                <Link style = {navStyle}  to = "/travel-app/ManageFunds"> 
                <li> ManageFunds</li>
                </Link> 


                <li style = {navStyle}> User Account</li>
            </ul>
        </nav>
    );
}

export default Nav;
