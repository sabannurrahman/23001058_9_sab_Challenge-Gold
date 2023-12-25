const { allProduct, productById, createProduct } = require('../controller/ProductController')

const router = require('express').Router()

router.get('/products', allProduct)
router.get('/products/:id', productById )
router.post('/products', createProduct )

module.exports = router
