//
//
import {
    TEST_SECURE_REQUEST,
    TEST_SECURE_SUCCESS,
    TEST_SECURE_FAIL,

    TEST_PUBLIC_REQUEST,
    TEST_PUBLIC_SUCCESS,
    TEST_PUBLIC_FAIL
} from '../constant/test'

export const testSecureReducer = ( state = {}, action ) => {
    switch (action.type) {
        case TEST_SECURE_REQUEST:
            return { loading: true }
        case TEST_SECURE_SUCCESS:
            return {
                loading: false,
                testSecure: action.payload
            }
        case TEST_SECURE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
           return state
    }
}

export const testPublicReducer = ( state = {}, action ) => {
    switch (action.type) {
        case TEST_PUBLIC_REQUEST:
            return { loading: true }
        case TEST_PUBLIC_SUCCESS:
            return {
                loading: false,
                testPublic: action.payload
            }
        case TEST_PUBLIC_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
           return state
    }
}
