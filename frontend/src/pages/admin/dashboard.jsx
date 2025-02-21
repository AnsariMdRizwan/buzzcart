import ProductImageUpload from '@/components/admin/image-upload';
import { Button } from '@/components/ui/button';
import { addFeatureImages, getFeatureImages } from '@/store/common-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Admindashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const dispatch = useDispatch();
  const {featureImageList} = useSelector(state=>state.commonFeature)

  console.log(uploadedImageUrl, "Image url here");

  const handleUploadImage = () => {
    dispatch(addFeatureImages(uploadedImageUrl)).then((data)=>{
      if(data?.payload?.success){
        dispatch(getFeatureImages())
        setImageFile(null)
        setUploadedImageUrl("");
      }
    })
  }

  useEffect(()=>{
    dispatch(getFeatureImages())
  },[dispatch])


  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoading={setImageLoading}
        imageLoading={imageLoading}
        isCustomStyling={true}
      />

      <Button
        onClick={handleUploadImage}
        className="bg-lime-200 font-bold mt-3 w-full gap-5">Upload</Button>

        <div className='flex flex-col gap-4 mt-5'>
          {
            featureImageList && featureImageList.length >0 ?
            featureImageList.map(featureImageItem=> <div>
              <img src={featureImageItem.image } 
               className='w-full h-[300px] object-cover rounded-t-lg '
              />
            </div> ): null
          }
        </div>
    </div>
    
  )
}

export default Admindashboard
