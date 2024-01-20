const router = require('express').Router()
const { allUsers, detailUser, deleteUser, editUsers } = require('../controller/UserController')



router.get("/users", allUsers)
 router.get('/users/:id', detailUser )
//  router.put('/users/:id', editUsers )
router.delete('/users/:id', deleteUser )

module.exports = router
