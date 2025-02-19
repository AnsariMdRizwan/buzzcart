const express = require("express")

const {createOrder, capturePayment,getALlOrderByuserId,getOrderDetails, }= require("../../controllers/shop/orders-controller")

const router= express.Router();

router.post('/create',createOrder);
router.post('/capture',capturePayment);
router.get('/list/:userId',getALlOrderByuserId);
router.get('/details/:id',getOrderDetails);

module.exports = router;