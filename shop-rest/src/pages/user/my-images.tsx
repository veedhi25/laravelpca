import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import { FiUpload } from 'react-icons/fi';
import Navbar from '@components/layout/navbar/navbar';
import Uploader from '@components/common/uploader';
import FileInput from '@components/ui/file-input-images';
import { useForm } from 'react-hook-form';
import { useUploadMutation } from '@data/upload/use-image-upload.mutation';
import  Button  from "@components/ui/button";
import { useImagesUploadMutation } from '@data/images-upload/use-image-upload.query';
import { useCustomerQuery } from '@data/customer/use-customer.query';
import { getImagesByUserId, useImagesByUserId } from '@data/images-upload/get-uploaded-images.query';
import { useDeleteImageMutation } from '@data/upload/use-image-delete.mutations';
import DefaultLayout from '@components/layout/default-layout';
import { CloseIcon } from '@components/icons/close-icon';
 

 
      
type ImageUploadFormValues = {
    images: [];
}

function ImagesUploader() {

  const [showUpload, setShowUpload] = useState(false);
  const { data: user } = useCustomerQuery();
  const [localImages, setLocalImages] = useState([]);
  const [resetUploader, setResetUploader] = useState(false);
  const [showNoImagesError, setShowNoImagesError] = useState(false);

  const { data: images, isLoading, isError, refetch } = getImagesByUserId(user?.me?.id);
  
  const isMobileView = () => {
    return window.innerWidth <= 768;
  };
  
  const noImagesErrorAnimation = useSpring({
    opacity: showNoImagesError ? 1 : 0,
    transform: showNoImagesError ? 'translateY(0px)' : 'translateY(-30px)',
  });
  

  const uploadAnimation = useSpring({
    opacity: showUpload ? 1 : 0,
    transform: showUpload ? 'translateY(0px)' : 'translateY(-50px)',
  });

  const deleteImageMutation = useDeleteImageMutation();

  const { mutate: storeImages } = useImagesUploadMutation({
    onSuccess: (data: { images: ConcatArray<never>; }) => {
      setLocalImages((prevLocalImages) => [...prevLocalImages, ...data.images]);
    },
  });

  useEffect(() => {
    if (user?.me?.id) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.me?.id]);

  const handleDelete = async (imageId: any) => {
    try {
      await deleteImageMutation.mutateAsync(imageId);
      refetch();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  console.log('images', localImages);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ImageUploadFormValues>({
    defaultValues: {
      images: [],
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: { image_data: any }) => {
    // Check if there are any images to upload
    if (data.image_data.length === 0) {
      // Show the "No images to upload" message
      setShowNoImagesError(true);
      setTimeout(() => {
        setShowNoImagesError(false);
      }, 3000);
      return;
    }
  
    try {
      const response = await storeImages({
        images: data.image_data,
        user_id: user?.me?.id,
      });
  
      // Update the localImages state
      setLocalImages((prevLocalImages) => [...prevLocalImages, ...data.image_data]);
  
      // Reset the uploader
      setResetUploader(true);
      setTimeout(() => {
        setResetUploader(false);
      }, 100);
    } catch (error) {
      // Handle any errors during the upload process
      console.error(error);
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-medium">My Images</h1>
            <button
              className={showUpload ? 'hidden' : 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'}
              onClick={() => setShowUpload(true)}
            >
              Upload
            </button>
          </div>
          {showUpload && (
            <animated.div style={uploadAnimation}>
              <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                  <FileInput name="image_data" multiple={true} control={control} reset={resetUploader} />
                </div>
                <Button>Submit</Button>
              </form>
            </animated.div>
          )}
         {showNoImagesError && (
            <animated.div style={noImagesErrorAnimation} className="absolute top-0 left-0 w-full p-4">
              <div className="bg-red-500 text-white text-center rounded p-2">
                No images to upload
              </div>
            </animated.div>
         )}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images &&
              images[0]?.image_data
                .concat(localImages)
                .map((image) => (
                  <div key={image.id} className="relative group">
                    <img src={image.thumbnail} className="w-full rounded-lg" />
                    {isMobileView() && (
                      <button
                        className="absolute -top-4 -right-4 mt-2 mr-2 text-red-500"
                        onClick={() => handleDelete(image.id)}
                      >
                        <CloseIcon className='h-7 w-7 text-white bg-red-700 rounded-full'/>
                      </button>
                    )}
                   <div className="absolute inset-0 lg:bg-black lg:opacity-0 lg:group-hover:opacity-80 lg:transition-opacity lg:rounded-lg">
                      <div className="absolute inset-0 flex justify-center items-center">
                        <button
                          className=" hidden lg:block px-4 py-2 lg:bg-red-500 text-white lg:inset-0 rounded hover:bg-red-600"
                          onClick={() => handleDelete(image.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

ImagesUploader.layout = DefaultLayout;

  export default ImagesUploader;
  
            
