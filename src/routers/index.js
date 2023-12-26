const { allUsers, usersById, createUsers } = require('../controller/ProductController')

const router = require('express').Router()

router.get('/users', allUsers)
router.get('/users/:id', usersById )
router.post('/users', createUsers )

module.exports = router
