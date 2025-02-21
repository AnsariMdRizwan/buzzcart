import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { StarIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { addTocart, fetchCartItems } from '@/store/shop/cart-slice'
import { setproductDetails } from '@/store/shop/product-slice'
import { Label } from '../ui/label'
import StarRatingComponent from '../common/star-rating.jsx'
import { addReview, getProductReview } from '@/store/shop/review-slice'


const ProductsDetailsDialog = ({ open, setOpen, productsDetails }) => {

    const dispatch = useDispatch();
    const [reviewMsg, setReviewMsg] = useState("")
    const [rating, setRating] = useState(0)
    const { user } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.shopCart)
    const { reviews } = useSelector(state => state.shopReview)

    const handleRating = (getRating) => {
        setRating(getRating)
    }

    const handleAddReview = () => {
        dispatch(addReview({
            productId: productsDetails?._id,
            userId: user?.id,
            userName: user?.userName,
            reviewMessage: reviewMsg,
            reviewValue: rating,
        })).then(data => {
            if (data.payload.success) {
                setRating(0);
                setReviewMsg("")
                dispatch(getProductReview(productsDetails?._id))
                if (data?.payload?.message) {
                    toast.error(data?.payload?.message)
                    return
                } else {

                    toast.success("Review Added")
                }
            }
        })
    }


    const handleAddtoCart = (getCurrentProductId, getTotalStock) => {
        console.log(getCurrentProductId);

        let getCartItem = cartItems.items || [];

        if (getCartItem.length) {
            const indexOfCurrentItem = getCartItem.findIndex(item => item.productId === getCurrentProductId)

            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItem[indexOfCurrentItem].quantity
                if (getQuantity + 1 > getTotalStock) {
                    toast.error(`only ${getQuantity} quantity can be added for this Item`)
                    return
                }
            }

        }

        dispatch(addTocart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id))
                // toast.success("product added to Cart ")
            }
        })
    }

    const handleDialogClose = () => {
        setOpen(false);
        dispatch(setproductDetails())
        setRating(0);
        setReviewMsg("")
    }

    useEffect(() => {
        if (productsDetails !== null) {
            dispatch(getProductReview(productsDetails?._id))
        }
    }, [productsDetails])

    console.log(reviews, "reviews")

    const averageReviews = reviews && reviews.length > 0 ?
        reviews.reduce((sum, reviewItems) => sum + reviewItems.reviewValue, 0) / reviews.length : 0

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}
        >
           <DialogContent 
    className='bg-slate-50 grid lg:overflow-auto h-full sm:grid-cols-2 grid-cols-1 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] overflow-auto'
>
    <div className='relative rounded-lg'>
        <img
            src={productsDetails?.image}
            alt={productsDetails?.title}
            className='aspect-square w-full object-cover'
            width={600}
            height={600}
        />
    </div>
    <div className='overflow-auto'>
        <div>
            <h1 className='text-3xl font-extrabold'>{productsDetails?.title}</h1>
            <p className='text-gray-400 mt-5 mb-7'>{productsDetails?.description}</p>
        </div>
        <div>
            <div className='flex items-center justify-between'>
                <p className={`text-3xl font-bold ${productsDetails?.salePrice > 0 ? 'line-through' : ''}`}>
                    ₹{productsDetails?.price}
                </p>
                {productsDetails?.salePrice > 0 && 
                    <p className='text-2xl font-bold'>₹{productsDetails?.salePrice}</p>
                }
            </div>
        </div>
        <div className="flex items-center gap-2">
            <div className='mt-2 flex items-center gap-0.5'>
                <StarRatingComponent rating={averageReviews} />
            </div>
            <span className='text-gray-400'>({averageReviews.toFixed(1)})</span>
        </div>
        <div>
            {productsDetails?.totalStock === 0 ? 
                <Button className="bg-gray-500 cursor-not-allowed mt-5 w-full text-white">Out Of Stock</Button> :
                <Button onClick={() => handleAddtoCart(productsDetails?._id, productsDetails?.totalStock)} className="bg-slate-700 mt-5 w-full text-white">Add to cart</Button>
            }
        </div>
        <Separator />
        <div className="overflow-auto max-h-[300px]">
            <h2 className='text-xl font-bold mb-4'>Reviews</h2>
            <div className="grid gap-6">
                {reviews && reviews.length > 0 ? 
                    reviews.map(reviewItem =>
                        <div className="flex gap-4" key={reviewItem.id}>
                            <Avatar className='w-10 h-10 border'>
                                <AvatarFallback>{reviewItem?.userName[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className='grid gap-1'>
                                <div className="flex items-center gap-2">
                                    <h3 className='font-bold'>{reviewItem?.userName}</h3>
                                </div>
                                <div className='mt-2 flex items-center gap-0.5'>
                                    <StarRatingComponent rating={reviewItem?.reviewValue} />
                                </div>
                                <p className='text-gray-600'>{reviewItem?.reviewMessage}</p>
                            </div>
                        </div>
                    ) : <h1>No Reviews</h1>
                }
            </div>
            <div className='mt-10 flex-col flex gap-2'>
                <Label className="font-bold">Write a Review</Label>
                <div className='flex'>
                    <StarRatingComponent rating={rating} handleRatingChange={handleRating} />
                </div>
                <input
                    name='reviewMsg' 
                    value={reviewMsg}
                    onChange={(event) => setReviewMsg(event.target.value)}
                    className='p-2 outline-none border rounded-md' 
                    placeholder='Write a review...' 
                />
                <Button
                    onClick={handleAddReview}
                    disabled={reviewMsg.trim() === ""}
                    className="bg-blue-950 text-white font-bold"
                >
                    Submit
                </Button>
            </div>
        </div>
    </div>
</DialogContent>


        </Dialog>
    )
}

export default ProductsDetailsDialog
