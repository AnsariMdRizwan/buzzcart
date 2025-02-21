import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const ShoppingProductTile = ({ product, handleGetProductDetails, handleAddtoCart }) => {
    return (    
        <Card className="w-full h-full max-w-xs mx-auto mt-9 hover:shadow-lg hover:scale-105 transition-transform duration-300">

            <div className='cursor-pointer' onClick={() => handleGetProductDetails(product?._id)}>
                <div className='relative'>
                    <img
                        src={product?.image}
                        alt={product?.title}
                        className='w-full h-[200px] sm:h-[300px] object-cover rounded-t-lg'

                    />  
                    {
                        product?.totalStock === 0 ?
                            <Badge className="absolute top-2 left-2 bg-cyan-700 hover:bg-cyan-400">Out Of Stock
                            </Badge> :
                            product?.totalStock < 10 ?
                                <Badge className="absolute top-2 left-2 bg-cyan-700 hover:bg-cyan-400">{`Only ${product?.totalStock} is Left`}
                                </Badge> :
                                product?.salePrice > 0 ? (
                                    <Badge className="absolute top-2 left-2 bg-cyan-700 hover:bg-cyan-400">Sale
                                    </Badge>
                                ) : null
                    }
                </div>
                <CardContent>
                    <h2 className='text-xl font-bold mb-2 mt-2'>{product?.title}</h2>
                    <div className='flex justify-between items-center mb-2'>
                        <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>₹{product?.price}</span>
                        {
                            product?.salePrice > 0 ? <span className='text-lime-500 font-bold'>₹{product?.salePrice}</span> : null
                        }

                    </div>
                </CardContent>
            </div>
            <CardFooter>
                {
                    product?.totalStock === 0 ?
                        <Button className="w-full bg-gray-600 text-white opacity-65 cursor-not-allowed">Out Of Stock</Button> :

                        <Button onClick={() => handleAddtoCart(product?._id, product?.totalStock)} className="w-full bg-blue-950 text-white">Add to Cart</Button>
                }
            </CardFooter>
        </Card>
    )
}

export default ShoppingProductTile
