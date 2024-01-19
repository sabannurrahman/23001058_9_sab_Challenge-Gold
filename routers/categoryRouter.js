const router = require('express').Router()
const { allCategories, deleteCategories, editCategories, createCategories, detailCategory } = require('../controller/CategoryController')



router.get("/Categories", allCategories)
router.get('/Categories/:id', detailCategory )
router.post('/Categories', createCategories )
router.put('/Categories/:id', editCategories )
router.delete('/Categories/:id', deleteCategories )

module.exports = router
