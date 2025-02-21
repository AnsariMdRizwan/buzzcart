const paypal = require('../../helpers/paypal');
const Cart = require('../../models/Cart');
const Order = require('../../models/Order');
const Product = require('../../models/Product');

const createOrder = async (req, res) => {
    try {
        const { userId, addressInfo, cartItems, orderStatus, paymentMethod, paymentStatus, totalAmount, orderDate, orderUpdateDate,
            cartId
        } = req.body;

        // Calculate total explicitly for consistency
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

        const create_Payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            redirect_urls: {
                return_url: 'https://buzzcarttt.netlify.app//shop/paypal-return',
                cancel_url: 'https://buzzcarttt.netlify.app//shop/paypal-cancel',
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map(item => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: "USD",
                            quantity: item.quantity,
                        })),
                    },
                    amount: {
                        currency: "USD",
                        total, // Use calculated total
                    },
                    description: 'Order payment',
                },
            ],
        };

        paypal.payment.create(create_Payment_json, async (error, paymentInfo) => {
            if (error) {
                console.error('PayPal Error:', JSON.stringify(error, null, 2));
                return res.status(500).json({
                    success: false,
                    message: `Error while creating PayPal payment: ${error.response ? error.response.message : error.message}`,
                });
            }

            const newlyCreatedOrder = new Order({
                userId,
                cartId,
                addressInfo,
                cartItems,
                orderStatus,
                paymentMethod,
                paymentStatus,
                totalAmount: parseFloat(total), // Ensure total matches payment
                orderDate,
                orderUpdateDate,
                PaymentId: null,
                PayerId: null,
            });

            await newlyCreatedOrder.save();

            const approvalURL = paymentInfo.links.find(link => link.rel === 'approval_url').href;

            res.status(201).json({
                success: true,
                approvalURL,
                orderId: newlyCreatedOrder._id,
            });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error occurred: ' + error.message,
        });
    }
};

const capturePayment = async (req, res) => {
    try {
        const { paymentId, payerId, orderId } = req.body

        let order = await Order.findById(orderId)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order can not be found"
            })
        }

        order.paymentStatus = 'Paid'
        order.orderStatus = "Confirmed"
        order.PaymentId = paymentId
        order.PayerId = payerId;


        for (let item of order.cartItems) {
            let product = await Product.findById(item.productId)

            if (!product) {
                return res.status.json({
                    success:false,
                    message:`we don't have Enough Stock For ${product.title}  `
                })
            }

            product.totalStock -= item.quantity
            await product.save();
        }

        const getCartId = order.cartId;
        await Cart.findByIdAndDelete(getCartId)

        await order.save();


        res.status(200).json({
            success: true,
            message: 'Order Confirmed'
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Some Error Occured !",
        })
    }
}




const getALlOrderByuserId = async (req, res) => {
    try {

        const { userId } = req.params;

        const orders = await Order.find({ userId })

        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: 'No Orders Found !'
            })
        }

        res.status(200).json({
            success: true,
            data: orders
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "some error Occured : " + error
        })
    }
}
const getOrderDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id)


        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found !'
            })
        }

        res.status(200).json({
            success: true,
            data: order
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "some error Occured : this error  " + error
        })
    }
}

module.exports = { createOrder, capturePayment, getALlOrderByuserId, getOrderDetails };
