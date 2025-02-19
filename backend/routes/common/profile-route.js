const express = require("express");

const {addProfileImage,getProfileImage} =require('../../controllers/common/profile-controller')

const router= express.Router();



router.post('/add',addProfileImage );
router.get('/get',getProfileImage);



module.exports = router;