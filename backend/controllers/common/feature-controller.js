const Feature = require('../../models/Features')

const addFeatureImage = async (req, res) => {
    try {
        const { image } = req.body;
        const featureImage = new Feature({
            image
        })

        await featureImage.save()

        res.status(201).json({
            success: true,
            data: featureImage
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Some Error Occured !",
        })
    }
}
const getFeatureImage = async (req, res) => {
    try {

        const iamges = await Feature.find({})

        res.status(200).json({
            success: true,
            data: iamges
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Some Error Occured !",
        })
    }
}


module.exports = { addFeatureImage, getFeatureImage }