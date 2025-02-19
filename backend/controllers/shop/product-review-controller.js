const Order = require('../../models/Order')
const Product = require('../../models/Product')
const Review = require('../../models/Review')


const addProductReview = async (req, res) => {
    try {

        const { productId,
            userId,
            userName,
            reviewMessage,
            reviewValue } = req.body


        const order = await Order.findOne({
            userId,
            "cartItems.productId": productId,
            orderStatus: 'Confirmed'
        })

        if (!order) {
            return res.status(403).json({
                success: false,
                message: ' Only Purchased Product can be reviewed'
            })
        }


        const checkExistingReview = await Review.findOne({
            productId, userId
        })

        if (checkExistingReview) {
            return res.status(400).json({
                success: false,
                message: 'you Already make review this Product'
            })
        }

        const newReview = new Review({
            productId, userId, userName, reviewMessage, reviewValue
        })

        await newReview.save()

        const reviews = await Review.find({ productId })

        const totalReviewLength = reviews.length;
        const averageReviews = reviews.reduce((sum, reviewItems) => sum + reviewItems.reviewValue, 0) / totalReviewLength

        await Product.findByIdAndUpdate(productId, { averageReviews })

        res.status(200).json({
            success: true,
            data: newReview
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error Occured " + error
        })
    }
}
const getProductReview = async (req, res) => {
    try {

        const { productId } = req.params;

        const reviews = await Review.find({ productId })

        res.status(200).json({
            success: true,
            data: reviews
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error Occured " + error
        })
    }
}


module.exports = { addProductReview, getProductReview };
