import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import { AuthContext } from './tools/context/AuthContext';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'

export default function Profile() {

    const { authState, setAuthState, setMessage, protect } = useContext(AuthContext)

    const H4 = styled.h4`
        margin: 0;
        text-transform: uppercase;
        font-size: .9em;
        opacity: 75%;
    `;
    const H2 = styled.h2`
        font-size: 1.3em;
        margin: 0;
        margin-bottom: 2.5%
    `;
    const H2HEAD = styled.h2`
        font-size: 3.5em;
        font-weight: 800;
        line-height: 95%;
    `;

    const BUTTON = styled.button`
        font-family: Poppins;
        border-radius: 10px;
        height: 3em;
        border: 3px solid black;
        width: 40%;
        font-weight: 600;
        margin: auto;
        background-color: white;
        padding: 3%;
        text-decoration: none;
        display: flex;
        align-items: center;
    `;

    const navigate = useNavigate()

    const exportData = async () => {

        protect()
        exportUserInfo({
            nome: authState.nome,
            cognome: authState.cognome,
            email: authState.email,
            telefono: authState.telefono,
            corso_interesse: authState.corso_interesse
        })
    }


    const exportUserInfo = (userInfo) => {
        const fileData = JSON.stringify(userInfo);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = authState.nome + "_" + authState.cognome + "_info.json";
        link.href = url;
        link.click()
    }

    useEffect(() => {
        protect()
    }, [])



    return (
        <>
        <div id='profile-page'>


            <H2HEAD>Your<br/>profile</H2HEAD>
            <section className='profile-data'>
                <section>
                    <H4>Nome</H4>
                    <H2>{authState.nome}</H2>
                </section>
                <section>
                    <H4>Cognome</H4>
                    <H2>{authState.cognome}</H2>
                </section>
                <section>
                    <H4>Email</H4>
                    <H2>{authState.email}</H2>
                </section>
                <section>
                    <H4>Telefono</H4>
                    <H2>{authState.telefono}</H2>
                </section>
                <section>
                    <H4>Corso di interesse</H4>
                    <H2>{authState.corso_interesse}</H2>
                </section>
            </section>
            <BUTTON onClick={exportData} >Esporta dati</BUTTON>
        </div>
        </>
    )
}