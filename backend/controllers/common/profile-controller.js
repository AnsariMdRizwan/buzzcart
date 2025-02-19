const Profile = require('../../models/Profile')

const addProfileImage = async (req, res) => {
    try {
        const { image } = req.body;
        const profileImage = new Profile({
            image
        })

        await profileImage.save()

        res.status(201).json({
            success: true,
            data: profileImage
        })


    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Some Error Occured !",
        })
    }
}
const getProfileImage = async (req, res) => {
    try {

        const iamges = await Profile.find({})

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


module.exports = { addProfileImage, getProfileImage }