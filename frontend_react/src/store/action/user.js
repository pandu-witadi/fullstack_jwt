//
//
import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
} from '../constant/user'

export const login = (email, password) => async( dispatch ) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('http://localhost:5154/api/user/login', {email, password}, config)
        console.log(data)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem( 'userInfo', JSON.stringify(data) )
    } catch(err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err.response && err.response.data.message
                  ? err.response.data.message
                  : err.message
        })
    }
}

export const logout = () => async( dispatch ) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })

    document.location.href = '/login'
}

export const register = (email, password, name) => async( dispatch ) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('http://localhost:5154/api/user/register', {email, password, name}, config)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem( 'userInfo', JSON.stringify(data) )
    } catch(err) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err.response && err.response.data.message
                  ? err.response.data.message
                  : err.message
        })
    }
}
