const express = require("express")

const {getAllOrderByAllUser,getOrderDetailsForAdmin,updateOrderStatus}= require("../../controllers/admin/order-controller")

const router= express.Router();


router.get('/get',getAllOrderByAllUser);
router.get('/details/:id',getOrderDetailsForAdmin);
router.put('/update/:id',updateOrderStatus);


module.exports = router;
