import { useContext, useCallback,useState } from 'react';
import {UserContext} from '../context/user/UserContext';
import loginService from '../helpers/loginService'
export default function useUser(){
    const {token, setToken} = useContext(UserContext)
    const [isLogged, setIsLogged] = useState(false)

    const loggin = useCallback((email: any, password: any) =>{
        loginService({email,password})
            .then(tokenRes=>{
                window.sessionStorage.setItem('token',tokenRes)
                setToken(tokenRes)
            })
            .catch(err=>{
                window.sessionStorage.removeItem('token')
                console.log(err)
            })
    },[setToken])

    const loggout = useCallback(() =>{
        window.sessionStorage.removeItem('token')
        setToken(null)
    },[setToken])


    return {
        isLoggedIn: Boolean(token),
        loggin,
        loggout
    }
}