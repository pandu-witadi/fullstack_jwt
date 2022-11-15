//
//  /api/test
//
const CF = require('../config/default')


const test_public = async (req, res) => {
    try {
        curDate = new Date()
        strDate = curDate.toISOString().slice(0, 10)
        strTime = curDate.toLocaleTimeString('en-US', {
            hour12: false,
            timeZone: "Asia/Jakarta"
        })

        return res.send({
            appName: CF.app.name,
            port: CF.server.port,
            appVersion: CF.app.version,
            random: Math.random(),
            toString: strDate + ' ' + strTime,
            toISOString: curDate.toISOString()
        })
    } catch (err) {
        return res.status(200).send(err)
    }
}


const test_secure = async (req, res) => {
    console.log('test_secure')
    return res.json({ "message": "this is secure route" })
}


module.exports = {
    test_public,
    test_secure
}
