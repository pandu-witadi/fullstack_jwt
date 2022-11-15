
//
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { test_public } from '../store/action/test'

const PublicSite = () => {
    const dispatch = useDispatch()
    const testPublic = useSelector( state => state.testPublic )

    useEffect( () => {
        dispatch( test_public() )
    }, [dispatch])
    return (
        <>
            <div><pre>{JSON.stringify(testPublic, null, 2) }</pre></div>
        </>
    )
}

export default PublicSite
