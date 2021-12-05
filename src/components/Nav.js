import { textAlign } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.JPG';
import pro from '../images/pro.JPG';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';



function Nav() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const navStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        textDecoration: 'none',
        background: 'white',
        padding: '1.8vh',
        borderRadius: '29px'
    }
    const navStyle2 = {
        fontSize: '18px',
        fontWeight: 'bold',
        textDecoration: 'none',
        textAlign: "center",
        justifyContent: "center",
        position: "relative"
    }

    const logoStyle = { height: '8.5vh' }


    return (
        <nav>

            <Link to="/travel-app/Home" >
                <img to="/travel-app/Home" style={logoStyle} src={logo} />
            </Link>
            <ul className="navlinks">


                {/* <Link style = {navStyle}  to = "/travel-app/Home" > 
                <li> home</li>
                </Link>
                 */}

                <Link style={navStyle} to="/travel-app/Trips" >
                    <li> Trips</li>
                </Link>

                <Link style={navStyle} to="/travel-app/ManageFunds">
                    <li> Manage Funds</li>
                </Link>


                <li style={navStyle2}>


                    <div>
                        <Button
                            id="demo-positioned-button"
                            aria-controls="demo-positioned-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <span style={{ position: "absolute", right: "120%", top: "30%" }}> Singh </span><img
                                src={pro}
                                style={{ width: "50px", height: "50px", borderRadius: "20px", border: "2px solid black" }}
                            />
                        </Button>
                        <Menu
                      
                            id="demo-positioned-menu"
                            aria-labelledby="demo-positioned-button"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <p  style ={{ padding : "0px 10px 4px" , borderBottom : "2px solid black" }} > <b>Profile </b> </p>
                            <p  style ={{ padding : "0px 10px 4px" , borderBottom : "2px solid black" }}   ><b> My account </b> </p>
                            <p  style ={{ padding : "0px 10px 4px" , borderBottom : "2px solid black"}}   > <b>Logout </b></p>
                        </Menu>
                    </div>





                </li>
            </ul>
        </nav>
    );
}

export default Nav;
