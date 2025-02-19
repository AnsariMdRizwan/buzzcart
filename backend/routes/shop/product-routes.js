const express = require('express')


const {getFilteredproduct,getproductDetails} = require('../../controllers/shop/product-controller')




const router = express.Router();

// router.get('/get',getFilteredproduct)
router.get('/get',getFilteredproduct)
router.get('/get/:id',getproductDetails)


module.exports = router;
