const router = require('express').Router()

const {  createUsers, loginUsers } = require('../controller/AuthController')


router.post('/signUp', createUsers)
router.post('/login', loginUsers)


module.exports = router