import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import ShoppingOrderDetails from './order_details';
import { Dialog } from '../ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { getALlOrderByuserId, getOrderDetails, resetOrderDEtails } from '@/store/shop/order-slice/index.js';
import { Badge } from '../ui/badge';

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shoppingOrder);

  const handleFetchOrderDetails = (orderId) => {
    setSelectedOrderId(orderId);
    dispatch(getOrderDetails(orderId));
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(getALlOrderByuserId(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  const handleCloseDialog = () => {
    setOpenDetailsDialog(false);
    dispatch(resetOrderDEtails());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead className="sr-only">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map((orderItem) => (
                <TableRow key={orderItem?._id}>
                  <TableCell>{orderItem?._id}</TableCell>
                  <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
                  <TableCell>
                    <Badge className={`py-1 px-3 font-bold text-white ${orderItem?.orderStatus === "Confirmed" ? "bg-green-500" :
                      orderItem?.orderStatus === "rejected" ? "bg-red-500" :
                        orderItem?.orderStatus === "pending" ? "bg-yellow-500" :
                          "bg-blue-950"
                      }`}>
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${orderItem?.totalAmount}</TableCell>
                  <TableCell>
                    <Button
                      className="bg-gray-400"
                      onClick={() => handleFetchOrderDetails(orderItem?._id)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Dialog open={openDetailsDialog} onOpenChange={handleCloseDialog}>
          {selectedOrderId && <ShoppingOrderDetails orderDetails={orderDetails} />}
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
