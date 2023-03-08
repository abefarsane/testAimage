import React, { useContext, useEffect, useState } from 'react';
import {createGlobalStyle} from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthContext } from './tools/context/AuthContext';


export default function Home() {

    const HomeStyle = createGlobalStyle`
        #home h2 {
            font-size: 3.5em;
            font-weight: 800;
            line-height: 95%;
        }
    
        #reveil-profile {
            font-family: Poppins;
            border-radius: 10px;
            height: 3em;
            border: 3px solid black;
            width: 30%;
            font-weight: 600;
            margin: auto;
            background-color: white;
            margin-top: 5%;
            padding: 2%;
            text-decoration: none;
        }
    
        #reveil-profile:-webkit-any-link {
          color: black
        }
    `;

    const { protect } = useContext(AuthContext)

    useEffect(() => {
        protect()
    }, [])

    return (
        <div id='home'>
            <HomeStyle />
            <h2>Home</h2>
            <Link id='reveil-profile' to='/profile'>Il mio profilo</Link>
        </div>
    )
}
