import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { clearCartState, deleteCartAfterPayment, deleteCartItems, fetchCartItems } from '@/store/shop/cart-slice';
import { capturePayment } from '@/store/shop/order-slice';
import { Loader } from 'lucide-react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';

const PayPalReturn = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector(state => state.auth)
  const params = new URLSearchParams(location.search)
  const paymentId = params.get('paymentId')
  const payerId = params.get('PayerID')
  // let {cartItems} = useSelector(state => state.shopCart)

  // let cartData = JSON.parse(localStorage.getItem('cartItems'));
  useEffect(() => {
    console.log("Payment ID:", paymentId);
    console.log("Payer ID:", payerId);

    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'))
      console.log("Order ID:", orderId);

      dispatch(capturePayment({ paymentId, payerId, orderId })).then(data => {
        console.log("Capture Payment response:", data);

        if (data?.payload?.success) {

          // sessionStorage.removeItem('currentOrderId')
          console.log("Payment successful");
          sessionStorage.removeItem("currentOrderId");
          dispatch(deleteCartAfterPayment(user?.id));
          window.location.href = `/shop/payment-success?paymentId=${paymentId}&payerId=${payerId}`
        } else {
          console.log("Payment not successful");
        }
      })
    }
  }, [paymentId, payerId, dispatch])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
      <Card className="w-full max-w-md text-center shadow-xl rounded-xl p-6">
        <CardHeader>
          <Loader className="w-12 h-12 text-blue-500 mx-auto animate-spin" />
          <CardTitle className="text-xl font-semibold text-gray-700 mt-4">
            Processing Your Payment...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Please wait while we complete your transaction.</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default PayPalReturn