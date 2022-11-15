//
//
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import './App.css'

import Header from './component/Header'
import Footer from './component/Footer'
import HomeScreen from './screen/HomeScreen'
import PublicScreen from './screen/PublicScreen'
import SecureScreen from './screen/SecureScreen'
import LoginScreen from './screen/LoginScreen'
import RegisterScreen from './screen/RegisterScreen'


const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path='/public' component={PublicScreen} exact/>
                    <Route path='/secure' component={SecureScreen} exact/>
                    <Route path='/login' component={LoginScreen} exact/>
                    <Route path='/register' component={RegisterScreen} exact/>
                    <Route path='/' component={HomeScreen} exact/>
                </Container>
            </main>
            <Footer />
        </BrowserRouter>
    )
}

export default App
