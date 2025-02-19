const express = require('express');


const { handleImageUpload,
    addProduct,
    fetchProduct,
    editProduct,
    deleteProduct,
 } = require('../../controllers/admin/products-controller.js')

const { upload } = require('../../helpers/cloudinary')


const router = express.Router();

router.post('/upload_image', upload.single('my_file'), handleImageUpload)

router.post('/add',addProduct);
router.get('/get',fetchProduct);
router.put('/edit/:id',editProduct);
router.delete('/delete/:id',deleteProduct);

module.exports = router;
