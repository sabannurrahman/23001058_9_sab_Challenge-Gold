const router = require('express').Router()
const authRouter = require('./authRouter')
const userRouter = require('./userRouter')



router.use("/api/v1", authRouter)
router.use("/api/v1", userRouter)

// router.get('/users/:id', usersById )
// router.post('/users', createUsers )
// router.patch('/users/:id', editUsers )
// router.delete('/users/:id', deleteUsers )

module.exports = router
