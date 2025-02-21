import React from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'


const ShoppingOrderDetails = ({ orderDetails }) => {

    const { user } = useSelector(state => state.auth)

    return (
        <DialogContent className="bg-white sm:max-w-[600px]">
            <div className='grid gap-4'>
                <div className="grid gap-2">
                    <div className="flex items-center justify-between  mt-4 ">
                        <p className='font-medium'>Order ID</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>
                    <div className="flex items-center justify-between mt-2 ">
                        <p className='font-medium'>Order Date </p>
                        <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
                    </div>
                    <div className="flex items-center justify-between mt-2 ">
                        <p className='font-medium'>Order Status </p>
                        <Label>  <Badge className={`py-1 px-3 font-bold text-white ${orderDetails?.orderStatus === "Confirmed" ? "bg-green-500" :
                            orderDetails?.orderStatus === "rejected" ? "bg-red-500" :
                                orderDetails?.orderStatus === "pending" ? "bg-yellow-500" :
                                    "bg-blue-950"
                            }`}>
                            {orderDetails?.orderStatus}
                        </Badge></Label>
                    </div>
                    <div className="flex items-center justify-between mt-2 ">
                        <p className='font-medium'>Order Price</p>
                        <Label>${orderDetails?.totalAmount}</Label>
                    </div>
                    <div className="flex items-center justify-between mt-2 ">
                        <p className='font-medium'>Payment Method</p>
                        <Label>{orderDetails?.paymentMeathod}</Label>
                    </div>
                    <div className="flex items-center justify-between mt-2 ">
                        <p className='font-medium'>Payment status</p>
                        <Label>{orderDetails?.paymentStatus}</Label>
                    </div>
                </div>
                <Separator className="bg-slate-600" />
                <div className='grid gap-4 '>
                    <div className="grid gap-2">
                        <div className='font-medium mb-5'>Order Details </div>
                        <ul className='grid gap-3'>
                            {
                                orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ?

                                    orderDetails?.cartItems.map(item =>

                                        <li className='flex items-center justify-between'>
                                            <span>Title :{item?.title}</span>
                                            <span>Quantity: {item?.quantity}</span>
                                            <span>Price :${item?.price}</span>
                                        </li>
                                    )
                                    : null

                            }
                        </ul>
                    </div>

                    <div className='grid gap-4'>
                        <div className="grid gap-2">
                            <div className="font-medium"> Shipping Info</div>
                            <div className="grid gap-0.5 text-zinc-500">
                                <span>{user.userName}</span>
                                <span>{orderDetails?.addressInfo?.address}</span>
                                <span>{orderDetails?.addressInfo?.city}</span>
                                <span>{orderDetails?.addressInfo?.phone}</span>
                                <span>{orderDetails?.addressInfo?.pincode}</span>
                                <span>{orderDetails?.addressInfo?.notes}</span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </DialogContent>
    )
}

export default ShoppingOrderDetails
