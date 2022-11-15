//
//
const express = require('express')
const path = require('path')
const cors = require('cors')

// const { notFound, errorHandler } = require('./middleware/error')
const CF = require('./config/default')


const app = express()

app.use( cors() )
app.use( express.json() )
app.use( express.urlencoded({ extended: true }) )

// API
app.use(CF.server.apiPath, require('./api/index'))

// for uploading
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

// serving frontend
const frontEndPath = path.join(__dirname, CF.frontEnd.path_vue)
app.use( express.static(frontEndPath) )
app.get(
    ['/', '/login', '/register'],
    function(req, res) {
        res.sendFile('index.html',  {root: frontEndPath} )
    }
)

// app.use(notFound)
// app.use(errorHandler)


module.exports = app
