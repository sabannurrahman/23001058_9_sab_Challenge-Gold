const router = require('express').Router()
const { allUsers } = require('../controller/UserController')



router.get("/users", allUsers)
// router.get('/users/:id', usersById )
// router.post('/users', createUsers )
// router.patch('/users/:id', editUsers )
// router.delete('/users/:id', deleteUsers )

module.exports = router
