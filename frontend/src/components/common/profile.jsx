import ProductImageUpload from '@/components/admin/image-upload';
import { Button } from '@/components/ui/button';
import { addProfileImages, getProfileImages } from '@/store/profile-slice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


const CommonProfile = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const dispatch = useDispatch();

 const handleUploadImage = () => {
     dispatch(addProfileImages(uploadedImageUrl)).then((data)=>{
       if(data?.payload?.success){
         dispatch(getProfileImages())
         setImageFile(null)
         setUploadedImageUrl("");
       }
     })
   }
    useEffect(()=>{
       dispatch(getProfileImages())
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
        className="bg-lime-200 font-bold mt-3 w-full gap-5" 
        disabled={imageLoading} 
      >
        {imageLoading ? "Uploading..." : "Upload"} 
      </Button>

      {/* Display uploaded images (if needed) */}
      <div className='flex flex-col gap-4 mt-5'>
        {/* Render uploaded images here */}
      </div>
    </div>
  )
}

export default CommonProfile