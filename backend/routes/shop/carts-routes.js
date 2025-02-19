const express = require('express')

const {addToCart,fetchCartItems,deleteCartItem,updateCartItemQty,deleteCartAfterPayment}=require('../../controllers/shop/cart-controller')


const router = express.Router();

router.post('/add',addToCart);
router.get('/get/:userId',fetchCartItems)
router.put('/updateCart',updateCartItemQty)
router.delete('/:userId/:productId',deleteCartItem)
router.post('/payment',deleteCartAfterPayment)

module.exports =router;