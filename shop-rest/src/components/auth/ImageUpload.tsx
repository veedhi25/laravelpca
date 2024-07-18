import React, { FC, useState } from 'react';

const resizeImage = async (file: File, maxWidth: number, maxHeight: number): Promise<File> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        let { width, height } = img;
  
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
  
        canvas.toBlob((blob) => {
          resolve(new File([blob!], file.name, { type: file.type }));
        }, file.type);
      };
    });
  };

  interface MultipleImagesUploadProps {
    onPhotosChange?: (photos: string[]) => void;
  }
  

  const MultipleImagesUpload: FC<MultipleImagesUploadProps> = ({ onPhotosChange }) => {
    
  const [images, setImages] = useState<string[]>([]);


  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // Resize the image maintaining the 3:4 aspect ratio and set the size to 640x853 pixels
      const resizedImage = await resizeImage(file, 640, 853);
      const reader = new FileReader();
      
    reader.onloadend = () => {
        setImages((prevState) => [...prevState, reader.result as string]);
        if (onPhotosChange) {
          onPhotosChange([...images, reader.result as string]);
        }
      };
      reader.readAsDataURL(resizedImage);
    };
  };

  const removeImage = (indexToRemove: number) => {
    const newImages = images.filter((_, index) => index !== indexToRemove);
    setImages(newImages);
    if (onPhotosChange) {
      onPhotosChange(newImages);
    }
  };
  

  const renderPhotos = () => {
    return images.map((photo, index) => {
      return (
        <div key={index} className="w-24 h-24 overflow-hidden rounded-lg shadow-md m-2 relative">
          <img src={photo} alt="" className="w-full h-full object-cover" />
          <div
            className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex justify-center items-center rounded-full cursor-pointer"
            onClick={() => removeImage(index)}
          >
            &times;
          </div>
        </div>
      );
    });
  };
  

  return (
    <div className="flex flex-col items-center">
      <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white">
      <svg xmlns="http://www.w3.org/2000/svg" 
           width="30" 
           height="30" 
           viewBox="0 0 24 24" 
           fill="red">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
      </svg>

        <span className="mt-2 text-gray-600 font-roboto leading-normal">Please add 3 photos</span>
        <input
          type="file"
          className="hidden"
          multiple
          onChange={handleImageChange}
        />
      </label>
      <div className="flex flex-wrap mt-4">{renderPhotos()}</div>
    </div>
  );
};

export default MultipleImagesUpload;
