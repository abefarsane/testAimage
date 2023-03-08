import React, { use, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './tools/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

export default function Navbar () {

    const { authState, logOut } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogout = () => {
        logOut()
        navigate('/')
    }

    const NavbarStyle = createGlobalStyle`

    .navbar {
        display: grid;
        grid-template-columns: 1fr 20% 20%;
        padding-right: 5%;
        padding-top: 3%;
    }
    
    .navbar h3 {
        margin: 0;
    }
    
    .navbar a {
        text-decoration: none;
        justify-self: end;
    }
    
    .navbar a:active {
        text-decoration: underline;
    }
    
    .navbar a:-webkit-any-link {
        color: black;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .navbar a:first-child {
        grid-column: 2;
    }



`;

    return (
        <>
        <NavbarStyle />
        <section className='navbar'>

            {
                !authState.status ? (
                    <>
                        <Link to='signup'>Signup</Link>
                        <Link to='login'>Login</Link>
                    </>
                ) : (
                    <>
                        <Link to='/'>Home</Link>
                        <Link onClick={handleLogout}>Logout</Link>
                    </>
                )
            }
        </section>
        </>
    )
}