const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    image: String
}, { timestamps: true })


module.exports = mongoose.model('Profile', ProfileSchema)