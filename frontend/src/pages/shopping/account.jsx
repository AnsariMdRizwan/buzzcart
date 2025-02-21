import React, { useState } from 'react';
import accImg from "../../assets/account.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Address from '@/components/shopping/address';
import ShoppingOrders from '@/components/shopping/orders';
import CommonProfile from '@/components/common/profile';

const ShoppingAccount = () => {
  const [activeTab, setActiveTab] = useState('orders');

  console.log(localStorage.getItem("cartItems"))
  return (
    <div className='flex flex-col'>
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src={accImg}
          className='h-full w-full object-center object-cover'
        />
      </div>
      <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
        <div className='flex flex-col rounded-lg border p-6 shadow-sm'>
          <Tabs defaultValue="orders" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger
                value="orders"
                className={activeTab === 'orders' ? 'bg-green-200 text-black font-bold' : ''}
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className={activeTab === 'address' ? 'bg-green-200 text-black font-bold' : ''}
              >
                Address
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className={activeTab === 'profile' ? 'bg-green-200 text-black font-bold' : ''}
              >
                Profile
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders"> 
             <ShoppingOrders/>
            </TabsContent>
            <TabsContent value="address">
              <Address/>
            </TabsContent>
            <TabsContent value="profile">
              <CommonProfile/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAccount;
