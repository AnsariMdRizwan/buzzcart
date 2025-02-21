import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { deleteCartItems, updateCartItems } from '@/store/shop/cart-slice'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'


const UserCartItemsContent = ({ cartItem }) => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.shopCart)
  const { productList } = useSelector(state => state.shopProducts)





  const handleCartItemsDelete = (getCartItem) => {
    dispatch(deleteCartItems({ userId: user?.id, productId: getCartItem?.productId }))
    toast.success("One item Deleted")
  }

  const handleUpdateQty = (cartItem, typeOfAction) => {
    if (typeOfAction === "plus") {
      let itemsInCartArray = cartItems.items || [];

      console.log(itemsInCartArray,"itemsCart");
      
      if (itemsInCartArray.length) {
        const indexOfCurrentItem = itemsInCartArray.findIndex(
          (item) => item.productId === cartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === cartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex]?.totalStock;
        console.log(getTotalStock, "getTotalStock");

        if (indexOfCurrentItem > -1) {
          const getQuantity = itemsInCartArray[indexOfCurrentItem]?.quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast.error(
              `Only ${getTotalStock}  items can be added for this product.`);
            return;
          }
        }
      }
    }

    dispatch(
      updateCartItems({
        userId: user?.id,
        productId: cartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? cartItem?.quantity + 1
            : Math.max(cartItem?.quantity - 1, 1), // Ensure quantity doesn't go below 1
      })
    );
  };



  return (
    <div className='flex items-center space-x-4 mb-2 '>
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className='w-20 h-20 rounded object-cover '
      />
      <div className='flex-1'>
        <h3>
          {cartItem?.title}
        </h3>
        <div className='flex items-center mt-1 gap-2'>
          <Button
            onClick={() => handleUpdateQty(cartItem, 'minus')}
            variant="outline"
            className="h-4 w-4 text-white bg-slate-900 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
          >
            <Minus className='w-4 h-4' />
            <span className='sr-only'>Decrease</span>
          </Button>
          <span className='font-semibold'>{cartItem?.quantity}</span>
          <Button
            onClick={() => handleUpdateQty(cartItem, 'plus')}
            variant="outline"
            className="w-4 h-4 text-white bg-slate-900 rounded-full"
            size="icon"
          >
            <Plus className='w-4 h-4' />
            <span className='sr-only'>Increase</span>
          </Button>
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <p className='font-semibold'>
          ₹{(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash onClick={() => handleCartItemsDelete(cartItem)} className='cursor-pointer mt-1 hover:text-red-700 hover:scale-125 duration-100  ' size={20} />
      </div>
    </div>
  )
}

export default UserCartItemsContent
