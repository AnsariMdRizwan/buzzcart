import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import AdminOrederDetails from './Orders_details'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from '@/store/admin/order-slice'
import { Badge } from '../ui/badge'

const AdminOreders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  const handleFetchOrdersDetails = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenDetailsDialog(true); // Open dialog immediately
    
      dispatch(getOrderDetailsForAdmin(orderId));  
    
  };

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  const handleCloseDialog = () => {
    setOpenDetailsDialog(false);
    dispatch(resetOrderDetails());
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
                      onClick={() => handleFetchOrdersDetails(orderItem?._id)}
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
          {orderDetails && orderDetails._id === selectedOrderId ? (
            <AdminOrederDetails orderDetails={orderDetails} />
          ) : (
            <div className="loading-spinner">Loading...</div>
          )}
        </Dialog>
      </CardContent>
    </Card>
  );
};




export default AdminOreders
