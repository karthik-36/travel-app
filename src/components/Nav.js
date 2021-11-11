import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <h3> The travellers </h3>
            <ul className="navlinks">
                 <Link to = "/travel-app/Trips" > 
                <li> Trips</li>
                </Link>

                <Link to = "/travel-app/ManageFunds"> 
                <li> ManageFunds</li>
                </Link> 


                <li> User Account</li>
            </ul>
        </nav>
    );
}

export default Nav;
