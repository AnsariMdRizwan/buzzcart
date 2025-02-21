import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import React, { Fragment, useEffect, useState } from 'react';
import ProductImageUpload from '@/components/admin/image-upload';
import { useDispatch, useSelector } from 'react-redux';
import { addNewproduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/products-slice';
import toast from 'react-hot-toast';
import AdminProductTile from '@/components/admin/product-tile';


const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: '',
};

const Adminproduct = () => {
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null)
  const { productList } = useSelector(state => state.adminproducts)


  const dispatch = useDispatch()


  const onSubmit = (event) => {
    event.preventDefault();

    currentEditedId !== null ?
      dispatch(editProduct({
        id: currentEditedId, formData
      })).then((data) => {
        console.log(data, "editing the existing product");

        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setFormData(initialFormData)
          setOpenCreateProduct(false)
          setCurrentEditedId(null)
        }


      }) :
      dispatch(addNewproduct({
        ...formData,
        image: uploadedImageUrl
      })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts())
          setOpenCreateProduct(false);
          setImageFile(null)
          setFormData(initialFormData);
          toast.success("Product added Successfully")

        }
      })
  };


  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  console.log(uploadedImageUrl, "image uploaded");

  // const isFormValid = () => {
  //   console.log("Form Data:", formData);
  //   console.log("Uploaded Image URL:", uploadedImageUrl);
  //   const isValid = (
  //     uploadedImageUrl &&
  //     Object.values(formData).every((value) => value && value.trim())
  //   );
  //   console.log("Is Form Valid:", isValid);
  //   return isValid;
  // };



  const handleDelete = (getCurrentProductId) => {
    console.log("Deleting product with ID:", getCurrentProductId);
    dispatch(deleteProduct({ id: getCurrentProductId })).then(data => {
      if (data?.payload?.success) {
        console.log("Product deleted successfully.");
        dispatch(fetchAllProducts());
      } else {
        console.error("Failed to delete product:", data?.payload?.message);
      }
    }).catch(err => {
      console.error("Error during deletion:", err);
    });
  };



  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProduct(true)} className="bg-black text-white">
          Add New Product
        </Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          productList && productList.length > 0 ?
            productList.map(productItem => <AdminProductTile setCurrentEditedId={setCurrentEditedId} setOpenCreateProduct={setOpenCreateProduct} setFormData={setFormData} product={productItem}
              handleDelete={handleDelete}

            />) : null
        }
      </div>
      <Sheet
        open={openCreateProduct}
        onOpenChange={() => {
          setOpenCreateProduct(false)
          setCurrentEditedId(null)
          setFormData(initialFormData)
        }
        }
      >
        <SheetContent side="right" className="overflow-auto bg-white">
          <SheetHeader>
            <SheetTitle>
              {
                currentEditedId != null ?
                  'Edit Product' : 'Add New Product'
              }
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoading={setImageLoading}
            imageLoading={imageLoading}
          />
          <div className='py-6'>
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
              formControls={addProductFormElements}
            // isBtnDisabled={!isFormValid()}

            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default Adminproduct;
