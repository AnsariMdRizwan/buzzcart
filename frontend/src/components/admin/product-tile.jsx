import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'


const adminProductTile = ({ product, setFormData, setOpenCreateProduct, setCurrentEditedId, handleDelete }) => {

  console.log()
  return (
    <>
      <Card className="w-full max-w-sm mx-auto">
        <div>
          <div className='relative'>
            <img
              src={product?.image}
              alt={product?.title}
              className='w-full h-[300px] object-cover rounded-t-lg'
            />
          </div>
          <CardContent>
            <h2 className='text-xl font-bold mb-2 mt-2'>{product?.title}</h2>
            <div className='flex justify-between items-center mb-2'>
              <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>₹{product?.price}</span>
              {
                product?.salePrice > 0 ? <span>₹{product?.salePrice}</span> : null
              }

            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button
              onClick={() => {
                setOpenCreateProduct(true)
                setCurrentEditedId(product?._id)
                setFormData(product)
              }}
              className="bg-blue-950 text-white">Edit</Button>
            <Button onClick={() => handleDelete(product?._id)} className="bg-blue-950 text-white">Delete</Button>
          </CardFooter>
        </div>
      </Card>
    </>
  )
}

export default adminProductTile
