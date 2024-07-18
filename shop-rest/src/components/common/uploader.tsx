import { UploadIcon } from "@components/icons/upload-icon";
import { useUploadMutation } from "@data/upload/use-upload.mutation";
import { useEffect, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { useTranslation } from "next-i18next";
import Spinner from "@components/ui/loaders/spinner/spinner";
import Loader from "@components/ui/loader/loader";
import { CloseIcon } from "@components/icons/close-icon";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { Attachment } from "@ts-types/custom.types";

const getPreviewImage = (value: any) => {
  let images: any[] = [];
  if (value) {
    images = Array.isArray(value)
      ? value.map(({ thumbnail }) => ({ preview: thumbnail }))
      : [{ preview: value.thumbnail }];
  }
  return images;
};


export default function Uploader({ onChange, value, multiple }: any) {

  const { t } = useTranslation();
  const [files, setFiles] = useState<Attachment[]>(getPreviewImage(value));
  const { mutate: upload, isLoading: loading } = useUploadMutation();

  const [fetchedImages, setFetchedImages] = useState([]);

  const { data: currentUser } = useCustomerQuery();

  const handleRemovePreview = (indexToRemove: number) => {
    setFetchedImages((prevUrls) => prevUrls.filter((_, index) => index !== indexToRemove));
  };


  useEffect(() => {
    const avatarUrls = currentUser?.me?.profile?.avatar.length && currentUser?.me?.profile?.avatar
      ?.filter((avatar: any) => Array.isArray(avatar) === false)
      .map((avatar: any) => avatar.thumbnail);
    setFetchedImages(avatarUrls);
  }, [currentUser]);

    
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple,
    onDrop: async (acceptedFiles) => {
      try {
        if (acceptedFiles.length) {
          upload(
            acceptedFiles, // it will be an array of uploaded attachments
            {
              onSuccess: (data) => {
                let mergedData;
  
                if (multiple) {
                  mergedData = files.concat(data);
                  setFiles(files.concat(data));
                } else {
                  mergedData = data;
                  setFiles(data);
                }
                if (onChange) {
                  onChange(mergedData);
                }
              },
              onError: (error) => {
                console.error("Error uploading the file:", error.message);
                // Handle the error (e.g., show a notification or an alert)
                // You can replace this with your preferred error handling method
                alert("An error occurred while uploading the file.");
              },
            }
          );
        }
      } catch (error) {
        console.error("Error occurred during file upload:", error);
        // Handle the error (e.g., show a notification or an alert)
        // You can replace this with your preferred error handling method
        alert("An error occurred while uploading the file.");
      }
    },
  });
  

  const handleDelete = (image: string) => {
    const images = files.filter((file) => file.thumbnail !== image);

    setFiles(images);
    if (onChange) {
      onChange(images);
    }
  };

  const thumbs = files?.map((file: any, idx) => {
    if (file.id) {
      return (
        <div
          className="inline-flex flex-col overflow-hidden border border-border-200 rounded mt-2 me-2 relative"
          key={idx}
        >
          <div className="flex items-center justify-center min-w-0 w-16 h-16 overflow-hidden">
            <img src={file.thumbnail} />
          </div>
          {multiple ? (
            <button
              className="w-4 h-4 flex items-center justify-center rounded-full bg-red-600 text-xs text-light absolute top-1 end-1 shadow-xl outline-none"
              onClick={() => handleDelete(file.thumbnail)}
            >
              <CloseIcon width={10} height={10} />
            </button>
          ) : null}
        </div>
      );
    }
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => URL.revokeObjectURL(file.thumbnail));
    },
    [files]
  );

  return (
    <section className="upload">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none",
        })}
      >
        <input {...getInputProps()} />
        <UploadIcon className="text-muted-light" />
        <p className="text-body text-sm mt-4 text-center">
          <span className="text-accent font-semibold">
            {t("   Upload png , jpg images ")}
          </span><br />
          {" "}
          {t(" or drag & drop")} <br />
          <span className="text-xs text-body">{t("")}</span>
        </p>
      </div>

      {(!!thumbs.length || loading) && (
      <aside className="flex flex-wrap mt-2">
        {fetchedImages?.map((url, index) => (
          <div
            key={`fetched-${index}`}
            className="inline-flex flex-col overflow-hidden border border-border-200 rounded mt-2 me-2 relative"
          >
            <div className="flex items-center justify-center min-w-0 w-16 h-16 overflow-hidden">
              <img src={url} />
            </div>
            <button
              className="w-4 h-4 flex items-center justify-center rounded-full bg-red-600 text-xs text-light absolute top-1 end-1 shadow-xl outline-none"
              onClick={() => handleRemovePreview(index)}
            >
              &times;
            </button>
          </div>
        ))}
        {!!thumbs.length && thumbs}
        {loading && (
          <div className="h-16 flex items-center mt-2 ms-2">
            <Loader simple={true} className="w-6 h-6" />
          </div>
        )}
      </aside>
      )}
      </section>
  );
}
