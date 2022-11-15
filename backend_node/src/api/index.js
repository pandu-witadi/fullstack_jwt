//
//
const router = require('express').Router()
const { authRequired } = require('../util/authentication')


// -----------------------------------------------------------------------------
const test = require('./test')
router.get('/test', test.test_public)
router.get('/test/secure', authRequired, test.test_secure)

// -----------------------------------------------------------------------------
const user = require('./user')
router.post('/user/register', user.register)
router.post('/user/login', user.login)

// // -----------------------------------------------------------------------------
// const user = require('./user')
// router.post('/user/get-data', user.getData)
// router.post('/user/update', user.updateData)
// router.post('/user/reset-data', user.resetData)
//
// // -----------------------------------------------------------------------------
// const report = require('./report')
// router.get('/report/summary/:projectID', report.summary)
// router.get('/report/status/:projectID', report.status)
// router.get('/report/write/:projectID/:prefixFile', report.writeUnitProgressAndUserRaw)


// -----------------------------------------------------------------------------
module.exports = router
