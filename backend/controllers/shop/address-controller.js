const Address = require('../../models/Address')

const addAddress = async (req, res) => {

    try {
        const { userId, address, city, pincode, phone, notes } = req.body;

        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.status(400).json({
                success: false,
                message: "getting invalid Data"
            })
        }

        const newlyCreatedAddress = Address({
            userId, address, city, pincode, notes, phone
        })
        await newlyCreatedAddress.save();

        res.status(200).json({
            success: true,
            data: newlyCreatedAddress
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "error occured" + error
        })
    }

}
const fetchAllAddress = async (req, res) => {

    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "user id invalid !"
            })
        }
        const addressList = await Address.find({ userId })

        res.status(200).json({
            success: true,
            data: addressList
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "error occured" + error
        })
    }

}
const updateAllAddress = async (req, res) => {

    try {
        const { userId, addressId } = req.params; 
        const formData = req.body;

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "required AddressId and UserId !"
            })
        }
        const address= await Address.findOneAndUpdate({_id:addressId,userId},
            formData,{new:true}
        )
         
        if(!address){
            return res.status(404).json({
                success:false,
                message:'Address not Found!'
            })
        }

        res.status(200).json({
            success:true,
            data: address
        })


    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "error occured update" + error
        })
    }

}
const deleteAllAddress = async (req, res) => {

    try {
        const { userId, addressId } = req.params; 

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "required AddressId and UserId !"
            })
        }
        const address = await Address.findOneAndDelete({_id:addressId,userId})
        if(!address){
            return res.status(404).json({
                success:false,
                message:'Address not Found!'
            })
        }

        res.status(200).json({
            success:true,
            message:"address deleted Successfully"
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "error occured" + error
        })
    }

}


module.exports = { addAddress, updateAllAddress, fetchAllAddress, deleteAllAddress } 