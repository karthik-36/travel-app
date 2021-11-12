import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/logo.JPG';

function Nav() {


    
    const navStyle = {
        fontSize : '24px',
        fontWeight : 'bold',
        textDecoration: 'none',
        background : 'white',
        padding : '1.8vh',
        borderRadius : '29px'
      }
    const navStyle2 = {
        fontSize : '24px',
        fontWeight : 'bold',
        textDecoration: 'none'
      }

    const logoStyle =   {height : '8.5vh'}
      

    return (
        <nav>
     
            <img style = {logoStyle} src = {logo} />
            <ul className="navlinks">


                

                 <Link style = {navStyle}  to = "/travel-app/Trips" > 
                <li> Trips</li>
                </Link>

                <Link style = {navStyle}  to = "/travel-app/ManageFunds"> 
                <li> Manage Funds</li>
                </Link> 


                <li style = {navStyle2}> user account</li>
            </ul>
        </nav>
    );
}

export default Nav;
