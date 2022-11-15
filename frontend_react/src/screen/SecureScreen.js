
//
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { test_secure } from '../store/action/test'


const SecureSite = () => {
    const dispatch = useDispatch()
    const testSecure = useSelector( state => state.testSecure )

    useEffect( () => {
        dispatch( test_secure() )
    }, [dispatch])

    return (
        <>
            <div><pre>{JSON.stringify(testSecure, null, 2) }</pre></div>
        </>
    )
}

export default SecureSite
