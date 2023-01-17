import {useContext, useCallback, useState} from 'react';
import {UserContext} from '../context/user/UserContext';
import loginService from '../helpers/loginService'
import {toast} from "react-toastify";

export default function useUser() {
    const {token, setToken} = useContext(UserContext)

    const loggin = useCallback((email: any, password: any) => {
        loginService({email, password})
            .then(tokenRes => {
                window.sessionStorage.setItem('token', tokenRes)
                setToken(tokenRes)
                toast.success('Welcome to bike4life', {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            .catch(err => {
                window.sessionStorage.removeItem('token')
                toast.error('Not authorized', {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
    }, [setToken])

    const loggout = useCallback(() => {
        window.sessionStorage.removeItem('token')
        setToken(null)
    }, [setToken])


    return {
        isLoggedIn: Boolean(token),
        loggin,
        loggout
    }
}