import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PayPalCancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <XCircle className="text-red-500 w-20 h-20 mx-auto animate-bounce" />
        <h2 className="text-2xl font-bold mt-4 text-gray-700">Payment Cancelled</h2>
        <p className="text-gray-600 mt-2">Your payment was not completed. If this was a mistake, you can try again.</p>

        <div className="mt-6 flex gap-4 justify-center">
          <Button onClick={() => navigate('/shop/account')} className="bg-blue-500 text-white px-6 py-2 rounded-md">
            view orders
          </Button>
          <Button onClick={() => navigate('/')} className="bg-gray-500 text-white px-6 py-2 rounded-md">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PayPalCancelPage;
