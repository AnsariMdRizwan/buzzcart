const express = require("express");
const {addAddress,deleteAllAddress,updateAllAddress,fetchAllAddress} =require('../../controllers/shop/address-controller')

const router= express.Router();



router.post('/add',addAddress);
router.get('/get/:userId',fetchAllAddress);
router.put('/update/:userId/:addressId',updateAllAddress);
router.delete('/delete/:userId/:addressId',deleteAllAddress);


module.exports = router;