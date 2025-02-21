import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/form'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, deleteAllAddress, fetchAllAddress, updateAllAddress } from '@/store/shop/address-slice'
import AddressCart from './addressCart'
import toast from 'react-hot-toast'


const initialAddressFormData = {
  address: '',
  city: '',
  phone: '',
  pincode: '',
  notes: '',
}

const Address = ({setCurrentSelectedAddress,selectedId }) => {

  const [formData, setFormData] = useState(initialAddressFormData)
  const [currentEditedId, setCurrentEditedID] = useState(null)
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth)
  const { addressList } = useSelector(state => state.shopingAddress)


  
  
  const handleManageAddress = (event) => {
    event.preventDefault();
    if (addressList.length>=3 && currentEditedId === null){
      setFormData(initialAddressFormData)
      toast.error("Can't Add more Address");
      return
    }

    currentEditedId !== null ?
      dispatch(updateAllAddress({
        userId: user?.id,
        addressId: currentEditedId,
        formData
      })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddress(user?.id));
          setCurrentEditedID(null)
          setFormData(initialAddressFormData)
          toast.success("Edited SuccessFully")
        }
      }) : dispatch(addNewAddress({
        ...formData,
        userId: user?.id
      })).then(data => {
        console.log(data);
        if (data?.payload?.success) {
          dispatch(fetchAllAddress(user?.id))
          setFormData(initialAddressFormData)
          toast.success("Address Saved")
        }
      })

  }




  const isFormValid = () => {
    return Object.keys(formData).map((key) => formData[key].trim() !== "").every((item) => item)
  }




  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch])
 

  const handleDeleteAddress = (getCurrentId) => {
    console.log(getCurrentId);
    dispatch(deleteAllAddress({

      userId: user?.id, addressId: getCurrentId?._id
    })).then(data => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.id))
        toast.success("Deleted One Address")
      }
    })

  }
  const handleEditAddress = (getCurrentId) => {
    setCurrentEditedID(getCurrentId?._id)
    setFormData({
      ...formData,
      address: getCurrentId?.address,
      city: getCurrentId?.city,
      phone: getCurrentId?.phone,
      pincode: getCurrentId?.pincode,
      notes: getCurrentId?.notes,
    })

  }



  return (
    <Card >
      <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-2 '>
        {
          addressList && addressList.length > 0 ?
            addressList.map(addressItem => <AddressCart 
              selectedId={selectedId}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
              addressInfo={addressItem}
              handleDeleteAddress={handleDeleteAddress}
              handleEditAddress={handleEditAddress}
            />) : null
        }
      </div>
      <CardHeader>
        <CardTitle>{currentEditedId !== null ? 'Edit Address' : 'Add new Address'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 ">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? 'Edit' : 'Add '}
          onSubmit={handleManageAddress}

          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  )
}

export default Address
