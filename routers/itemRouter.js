const router = require('express').Router()
const { allItems, deleteItems, editItems, createItems, detailItem } = require('../controller/ItemController')

router.get("/Items", allItems)
 router.get('/Items/:id', detailItem )
router.post('/Items', createItems )
router.put('/Items/:id', editItems )
router.delete('/Items/:id', deleteItems )

module.exports = router
