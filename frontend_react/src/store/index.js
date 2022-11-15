//
//
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {
    userLoginReducer,
    userRegisterReducer
} from './reducer/user'

import {
    testSecureReducer,
    testPublicReducer
 } from './reducer/test'


const reducer = combineReducers({
    testSecure: testSecureReducer,
    testPublic: testPublicReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})

// get from local localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const testSecureFromStorage = localStorage.getItem('testSecure')
    ? JSON.parse(localStorage.getItem('testSecure'))
    : null

const testPublicFromStorage = localStorage.getItem('testPublic')
    ? JSON.parse(localStorage.getItem('testPublic'))
    : null


const initialState = {
    testSecure: testSecureFromStorage,
    testPublic: testPublicFromStorage,
    userLogin: {
        userInfo: userInfoFromStorage
    }
}
const middleware = [ thunk ]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools( applyMiddleware( ...middleware) )
)

export default store
