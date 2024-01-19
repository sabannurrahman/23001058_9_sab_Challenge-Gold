const router = require('express').Router()

const {  createUsers } = require('../controller/AuthController')



router.post('/signUp', createUsers)
// router.get('/signIn', allUsers )


module.exports = router