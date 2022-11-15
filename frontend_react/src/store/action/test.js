//
//
import axios from 'axios'

import {
    TEST_SECURE_REQUEST,
    TEST_SECURE_SUCCESS,
    TEST_SECURE_FAIL,

    TEST_PUBLIC_REQUEST,
    TEST_PUBLIC_SUCCESS,
    TEST_PUBLIC_FAIL
} from '../constant/test'


export const test_secure = () => async( dispatch, getState ) => {
    try {
        dispatch({ type: TEST_SECURE_REQUEST })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                   'accessToken': userInfo.accessToken
               }
        }
        const { data } = await axios.get('http://localhost:5154/api/test/secure', config)
        dispatch({
            type: TEST_SECURE_SUCCESS,
            payload: data
        })
        localStorage.setItem( 'testSecure', JSON.stringify(data) )
    } catch(err) {
        dispatch({
           type: TEST_SECURE_FAIL,
           payload: err.response && err.response.data.message
                 ? err.response.data.message
                 : err.message
       })
    }
}

export const test_public = () => async( dispatch, getState ) => {
    try {
        dispatch({ type: TEST_PUBLIC_REQUEST })
        const config = { headers: { } }
        const { data } = await axios.get('http://localhost:5154/api/test', config)
        dispatch({
            type: TEST_PUBLIC_SUCCESS,
            payload: data
        })
    } catch(err) {
        dispatch({
           type: TEST_PUBLIC_FAIL,
           payload: err.response && err.response.data.message
                 ? err.response.data.message
                 : err.message
       })
    }
}
