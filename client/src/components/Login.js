import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './tools/context/AuthContext';
import { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")

    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const { authState, setAuthState, message, setMessage, protect } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        if (!email || !pwd) {
            setError("Ricontrolla e correggi i dati")
        } else {

            let user = {
                email: email,
                pwd: pwd
            }

            axios.post("http://localhost:3001/auth/login", user)
                .then((response) => {
                    if (response.data.err) {
                        setMessage("")
                        setError(response.data.err)
                    } else {
                        setMessage("")
                        localStorage.setItem("access", response.data.token)
                        localStorage.setItem('refresh', response.data.refreshToken)
                        console.log(response.data)
                        setAuthState({
                            status: true
                        })
                        navigate('/profile')
                    }
                    
                })
        }
    }

    

    const FormStyle = createGlobalStyle`
    #form-pages form section input[type=text], #form-pages form section input[type=number], #form-pages form section input[type=email], #form-pages form section input[type=password], .form-pages form section select {
    font-family: Poppins;
    border-radius: 10px;
    height: 2em;
    border: 3px solid black;
    padding-left: 2%;
    width: 60%;
    font-weight: 600;
    transition: border 0.5s;
    background-color: white;
  }
  

  #form-pages h2 {
      font-size: 3.5em;
      font-weight: 800;
      line-height: 95%;
  }


  #contain-form {
      display: grid;
      row-gap: 2%;
  }


  #form-pages form section select {
      height: 2.7em;
      width: 65%;
  }

  #form-pages section h4 {
      margin: 0;
      text-transform: uppercase;
      opacity: 75%;
      font-size: .9em;
      margin-bottom: .5%;
      width: 50%;
      align-items: center;
  }


  #form-pages button {
      font-family: Poppins;
      border-radius: 10px;
      height: 3em;
      border: 3px solid black;
      width: 30%;
      font-weight: 600;
      margin: auto;
      background-color: white;
      margin-top: 10%
  }


  #pwdnote {
      font-size: .8em;
      opacity: 75%;
  }

  #pwdnote svg {
      margin-right: 2%;
  }


  .invalid {
      border: 3px solid red !important;
  }
  .valid {
      border: 3px solid rgb(0, 191, 0) !important;
  }

  input:focus{
      outline: none;
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


    return (
        <><FormStyle />
        <div id='form-pages'>
            {
                authState.status ? (
                    <>
                        <h1>Sei già autenticato!</h1>
                        <Link id='reveil-profile' to='/profile'>Il mio profilo</Link>
                    </>
                ) : (
                    <>
<h2>Login</h2>
            <p id='success' className={success == "" ? "hide" : "show"}>{success}</p>
            <p id='error' className={error == "" && message == "" ? "hide" : "show"}>{error + message}</p>
            
            <form onSubmit={handleLogin}>

                <div className='contain-form'>
                <section>
                    <h4>Email</h4>
                    <input
                        type='text'
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                </section>

                <section>
                    <h4>Password</h4>
                    <input
                        type='password'
                        onChange={(e) => {
                            setPwd(e.target.value)
                        }}
                    />
                </section>
                </div>
                <button onClick={protect}>
                    Login
                </button>
            </form>
                    </>
                )
            }
            
        </div>
        </>
    )
}