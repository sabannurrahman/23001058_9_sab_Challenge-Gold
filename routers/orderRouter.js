const router = require('express').Router()
const { allOrders, detailOrder,statusSelesai, statusKirim, createOrder, deleteOrder } = require('../controller/OrderController')

router.get("/Orders", allOrders)
router.get('/Orders/:id', detailOrder )
router.post('/Orders', createOrder)
//Note: Endpoint perubahan status bisa dijadikan 1 saja, status bisa dikirim melalui request bodynya
 router.put('/Orders/statusKirim/:id', statusKirim )
 router.put('/Orders/statusSelesai/:id', statusSelesai )
 router.delete('/Orders/:id', deleteOrder )

module.exports = router
