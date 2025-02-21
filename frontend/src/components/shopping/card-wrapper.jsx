import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import UserCartItemsContent from './cards-items-content';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  clearCartState, fetchCartItems } from '@/store/shop/cart-slice';

const UserCardWrapper = ({ cartItems ,setOpenshoppingCartSheet }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user}= useSelector(state=>state.auth)
  

  
  useEffect(() => {
    if (user?.id) {
        dispatch(fetchCartItems(user?.id));
        dispatch(clearCartState());
    }
}, [dispatch,user?.id]);

  // Calculate total amount

  


  const totalCartAmount = cartItems && cartItems.length > 0
    ? cartItems.reduce(
      (sum, currentValue) =>
        sum + (currentValue?.salePrice > 0
          ? currentValue.salePrice
          : currentValue?.price) * currentValue?.quantity,
      0
    )
    : 0;

  return (
    <SheetContent className="sm:max-w-md bg-slate-50 overflow-y-auto max-h-screen">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y4 ">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
            <UserCartItemsContent key={item.id} cartItem={item} />
          ))
          : null}
      </div>
      <div className="mt-8 space-y4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      <Button
        
        onClick={() => 
        navigate('/shop/checkout',
          setOpenshoppingCartSheet(false)
        )}
        
        className="w-full mt-6 bg-blue-950 text-white"

      >Checkout</Button>
    </SheetContent>
  );
};

export default UserCardWrapper;
