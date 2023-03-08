import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import { createGlobalStyle } from 'styled-components';
import { AuthContext } from './tools/context/AuthContext';

export default function Signup() {

    axios.defaults.withCredentials = true

    const navigate = useNavigate()

    const { setMessage } = useContext(AuthContext)


    const [nome, setNome] = useState("")
    const [cognome, setCognome] = useState("")

    const [email, setEmail] = useState("")
    const [validEmail, setValidEmail] = useState(false)

    const [pwd, setPwd] = useState("")
    const [pwdFocus, setPwdFocus] = useState(false)


    const [confPwd, setConfPwd] = useState("")
    const [validPwd, setValidPwd] = useState(false)
    const [validMatch, setValidMatch] = useState(false)

    const [telefono, setTelefono] = useState(0)
    const [interesse, setInteresse] = useState(0)
    
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === confPwd);
    }, [pwd, confPwd])


    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const USER_REGEX = /^[A-Za-z][A-Za-z0-9_]{2,14}$/

    const handleSignup = (e) => {

        e.preventDefault()

        if (nome == "" || cognome == "" || email == "" || telefono == "" || interesse == 0 || !validEmail) {
            setSuccess("")
            setError("Dati mancanti o non conformi.")
        } else if (!validPwd) {
            setSuccess("")
            setError("Password invalida.")
        } else if (!validMatch) {
            setSuccess("")
            setError("")
            setError("Le password non coincidono.")
        } else  {

            const user = {
                nome: nome,
                cognome: cognome,
                telefono: telefono,
                email: email,
                corso_interesse: interesse,
                pwd: pwd
            }

            console.log(user)

            axios.post("http://localhost:3001/auth/sign", user)
            .then((response) => {
                if (response.data.status == true) {
                    setError("")
                    setMessage("Procedi con il tuo primo login!")
                    navigate("/login")
                } else {
                    setSuccess("")
                    if (response.data.err.errors[0].type == "unique violation") {
                        setError("Utente con email già esistente. Cambiarla oppure fare il login.")
                    } else {
                        setError("Errore sconosciuto.")
                    }
                }
            })
        }

    }


    useEffect(() => {
        console.log(validEmail)
        let EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if ( EMAIL_REGEX.test(email) ) {
            setValidEmail(true)
        } else {
            setValidEmail(false)
        }
    }, [email])



    useEffect(() => {
        setError("")
        setSuccess("")
    }, [])

    const FormStyle = createGlobalStyle`
  #form-pages form section input[type=text], #form-pages form section input[type=number], #form-pages form section input[type=email], #form-pages form section input[type=password], #form-pages form section select {
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
  

  #form-pages h2, .profile-page h2 {
      font-size: 3.5em;
      font-weight: 800;
      line-height: 95%;
  }


  .contain-form {
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
      margin-top: 15%;
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
`;


    return (
        <><FormStyle />
        <div id='form-pages'>
            <h2>Sign up</h2>

            <p id='success' className={success == "" ? "hide" : "show"}>{success}</p>
            <p id='error' className={error == "" ? "hide" : "show"}>{error}</p>
            
            <form onSubmit={handleSignup}>
                <div className='contain-form'>

                <section>
                    <h4>Nome</h4>
                    <input
                        type='text'
                        placeholder='Es. Mario'
                        onChange={(e) => {
                            setNome(e.target.value)
                        }}
                    />
                </section>

                <section>
                    <h4>Cognome</h4>
                    <input
                        type='text'
                        placeholder='Es. Rossi'
                        onChange={(e) => {
                            setCognome(e.target.value)
                        }}
                    />
                </section>

                <section>
                    <h4>Telefono</h4>
                    <input
                        type='number'
                        onChange={(e) => {
                            setTelefono(e.target.value)
                        }}
                    />
                </section>

                <section>
                    <h4>Email</h4>
                    <input
                        type='email'
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        className={validEmail ? "valid" : "invalid"}
                    />
                </section>

                <section>
                    <h4>Password</h4>
                    <input
                        type='password'
                        onChange={(e) => {
                            setPwd(e.target.value)
                        }}
                        className={validPwd ? "valid" : "invalid"}
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "show" : "hide"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.
                        Must include uppercase and lowercase letters, a number and a special character.
                        Allowed special characters: 
                        <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                </section>
                <section>
                    <h4>Ridigita la password</h4>
                    <input
                        type='password'
                        onChange={(e) => {
                            setConfPwd(e.target.value)
                        }}
                        className={validMatch ? "valid" : "invalid"}
                    />
                </section>

                <section>
                    <h4>Corso di interesse</h4>
                    <select onChange={(e) => {
                        setInteresse(e.target.value)
                    }}>
                       <option value="0">Seleziona</option>
                       <option value="React">React</option>
                       <option value="VueJS">VueJS</option>
                       <option value="NodeJS">NodeJS</option>
                       <option value="MongoDBs">MongoDBs</option>
                    </select>
                </section>
                </div>

                <button>Registrati</button>
            </form>
        </div>
        </>
    )
}