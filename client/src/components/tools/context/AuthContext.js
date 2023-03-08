import React, { createContext, useState , useEffect} from "react";
import axios from 'axios'

export const AuthContext = createContext("")


export const AuthContextProvider = ({children}) => {

    const [message, setMessage] = useState("")

    const [authState, setAuthState] = useState({
        status: false,
        nome: "",
        cognome: "",
        email: "",
        telefono: "",
        corso_interesse: ""
    })

    const logOut = () => {
        localStorage.removeItem('access')

        setAuthState({ status: false})
    }

    

    


    const requestLogin = async (accessToken, refreshToken) => {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3001/auth/user-info', {
                headers: { 'authorization' : `Bearer ${accessToken}` }
            }).then(async (response) => {
                if (response.data?.error) {
                    if (response.data.error === "Utente non autenticato. Fare il login.") {
                        setMessage(response.data.error)
                        setAuthState({ status: false})
                    } else if (response.data.error == "Token scaduto.") {
                        const accessToken = await refresh(refreshToken)
                        return await requestLogin(accessToken, refreshToken)
                    }

                    resolve(false)
                    
                } else {
                    //ACCESSO SICURO

                    setAuthState({
                        status: true,
                        nome: response.data?.nome,
                        cognome: response.data?.cognome,
                        email: response.data?.email,
                        telefono: response.data?.telefono,
                        corso_interesse: response.data?.corso_interesse
                    })
                    console.log(authState)
                    resolve(true)
                }
            })
        })
    }

    const protect = async (e) => {
        let accessToken = localStorage.getItem('access')
        let refreshToken = localStorage.getItem('refresh')

        accessToken = await hasAccess(accessToken, refreshToken)

        if (!accessToken) {
            setMessage("Sessione scaduta. Ripetere il login.")
            setAuthState({ status: false})
        } else {
            await requestLogin(accessToken, refreshToken)
        }
    }

    const hasAccess = async (accessToken, refreshToken) => {
        if (!refreshToken) {
            setAuthState({ status: false})
            return null
        }
    //TOKEN SCADUTO 
        if (accessToken === undefined) {
            accessToken = await refresh(refreshToken)
            return accessToken
        }

        return accessToken
    }

    const refresh = (e) => {
        console.log('Refreshing token!')

        return new Promise((resolve, reject) => {
            axios.post('http://localhost:3001/auth/renewAccessToken', {
                token: localStorage.getItem('refresh')
            }).then((response) => {
                if (response.data.error) {
                    setMessage(response.data.error)
                    setAuthState({ status: false})
                    resolve(false)
                } else {
                    localStorage.setItem('access', response.data.token)

                    resolve(localStorage.getItem('access'))
                }
            })
        })

        
    }


    
    useEffect(() => {
        protect()
    }, [])
    
    return (
        <AuthContext.Provider value={{ authState, setAuthState, logOut, message, setMessage, protect }}>
            { children }
        </AuthContext.Provider>
    )

}