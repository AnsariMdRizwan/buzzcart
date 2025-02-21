import { clearCartState } from '@/store/shop/cart-slice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract paymentId and payerId from URL
  const params = new URLSearchParams(location.search);
  const paymentId = params.get('paymentId');
  const payerId = params.get('payerId');

  useEffect(() => {
    dispatch(clearCartState());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <CheckCircle className="text-green-500 w-20 h-20 mx-auto animate-bounce" />
        <h2 className="text-2xl font-bold mt-4 text-gray-700">Payment Successful!</h2>
        <p className="text-gray-600 mt-2">Thank you for your purchase. Your order has been placed successfully.</p>

        <div className="mt-4 p-4 bg-gray-200 rounded-md text-left">
          <p><strong>Payment ID:</strong> {paymentId}</p>
          <p><strong>Payer ID:</strong> {payerId}</p>
        </div>

        <div className="mt-6 flex gap-4 justify-center">
          <Button onClick={() => navigate('/shop/account')} className="bg-blue-500 text-white px-6 py-2 rounded-md">
            View Orders
          </Button>
          <Button onClick={() => navigate('/')} className="bg-emerald-500 text-white px-6 py-2 rounded-md">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
