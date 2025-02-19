const Order = require("../../models/Order")


const getAllOrderByAllUser = async (req, res) => {
    try {



        const orders = await Order.find({})

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
            message: "some error Occured this is the error: " + error
        })
    }
}

const getOrderDetailsForAdmin = async (req, res) => {
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

const updateOrderStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const { orderStatus } = req.body

        const order = await Order.findById(id)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found !"
            })
        }

        await Order.findByIdAndUpdate(id, { orderStatus })

        res.status(200).json({
            success: true,
            message: 'ORder status is Updated SuccessFully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "some error Occured : this error  " + error
        })
    }
}


module.exports = { getAllOrderByAllUser, getOrderDetailsForAdmin, updateOrderStatus };