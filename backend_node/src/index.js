//
//
require('dotenv').config()
const app = require('./app')

const { connect_mongodb } = require('./config/mongodb')
const CF = require('./config/default')

connect_mongodb()

let port = process.env.PORT || CF.server.port
let server = app.listen(port, () => {
    console.log(`${CF.app.name} ${CF.app.version} server started - listening to port ${port}`)
})
