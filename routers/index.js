const router = require('express').Router()
const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const itemRouter = require('./itemRouter')


router.use("/api/v1", authRouter)
router.use("/api/v1", userRouter)
router.use("/api/v1", categoryRouter)
router.use("/api/v1", itemRouter)


module.exports = router
