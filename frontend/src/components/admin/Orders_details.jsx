import React, { useState } from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import CommonForm from '../common/form'
import { Badge } from '../ui/badge'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from '@/store/admin/order-slice'
import { useDispatch } from 'react-redux'

const initialFormData = {
    status: ''
}
const AdminOrederDetails = ({ orderDetails }) => {
    const [formData, setFormData] = useState(initialFormData)
    const dispatch = useDispatch();

    const handleUpdateStatus = (event) => {
        event.preventDefault();
        console.log(formData)
        const { status } = formData;

        dispatch(updateOrderStatus({ id: orderDetails?._id, orderStatus: status })).then(data => {
            if (data?.payload?.success) {
                dispatch(getOrderDetailsForAdmin(orderDetails?._id))
                dispatch(getAllOrdersForAdmin())
                setFormData(initialFormData)
            }

        })
    }

    return (
        <DialogContent className="bg-white sm:max-w-[600px]">
            <div className='grid gap-6'>
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
                        <Label>
                            <Badge className={`py-1 px-3 font-bold text-white ${orderDetails?.orderStatus === "Confirmed" ? "bg-green-500" :
                                    orderDetails?.orderStatus === "rejected" ? "bg-red-500" :
                                    orderDetails?.orderStatus === "pending" ? "bg-yellow-500" :
                                            "bg-blue-950"
                                }`}>
                                {orderDetails?.orderStatus}
                            </Badge>

                        </Label>
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
                            <div className="grid gap-0.5 text-zinc-300">
                                <span>Ansari Rizwan</span>

                            </div>

                        </div>
                    </div>
                    <div>
                        <CommonForm
                            formControls={
                                [
                                    {
                                        label: 'Order Status',
                                        name: 'status',
                                        componentType: 'select',

                                        options: [
                                            { id: 'inProcess', label: 'In Process' },
                                            { id: 'inShipping', label: 'In Shipping' },
                                            { id: 'rejected', label: 'Rejected' },
                                            { id: 'delivered', label: 'Delivered' },
                                            { id: 'pending', label: 'Pending' },

                                        ],
                                    },
                                ]
                            }
                            formData={formData}
                            setFormData={setFormData}
                            buttonText={'update Order status '}
                            onSubmit={handleUpdateStatus}
                        />
                    </div>
                </div>
            </div>
        </DialogContent>
    )
}

export default AdminOrederDetails 
