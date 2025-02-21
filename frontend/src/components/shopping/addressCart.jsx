import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const AddressCart = ({ addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress, selectedId }) => {

    return (
        <Card
            onClick={
                setCurrentSelectedAddress
                    ? () => setCurrentSelectedAddress(addressInfo)
                    : null
            }
            className={`cursor-pointer border-red-700 ${selectedId?._id === addressInfo?._id
                    ? "border-red-900 border-[2px] bg-blue-200"
                    : "border-black"
                }`}
        >
            <CardContent className="grid p-4 gap-4 cursor-pointer">
                <Label>Address: {addressInfo?.address} <br /></Label>
                <Label> City :{addressInfo?.city} <br /></Label>
                <Label>PinCode: {addressInfo?.pincode}<br /> </Label>
                <Label>Phone : {addressInfo?.phone}<br /> </Label>
                <Label>Notes : {addressInfo?.notes}<br /> </Label>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button className="bg-blue-100 text-black"
                    onClick={() => handleEditAddress(addressInfo)}
                >
                    Edit
                </Button>
                <Button className="bg-blue-100 text-black"
                    onClick={() => handleDeleteAddress(addressInfo)}
                >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    )
}

export default AddressCart
