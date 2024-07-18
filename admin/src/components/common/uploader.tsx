import { UploadIcon } from "@components/icons/upload-icon";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Attachment } from "@ts-types/generated";
import { CloseIcon } from "@components/icons/close-icon";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { useUploadMutation } from "@data/upload/use-upload.mutation";
 
 
const getPreviewImage = (value) => {
  let previews = [];
  if (value) {
    if (typeof value === 'string') { // Handle single URL
      previews.push({ thumbnail: value, type: 'image' });
    } else if (Array.isArray(value)) {
      value.forEach(item => {
        if (typeof item === 'string') { // Handle each item as URL
          previews.push({ thumbnail: item, type: 'image' });
        } else if (item instanceof File) { // Handle each item as File object
          previews.push({ thumbnail: URL.createObjectURL(item), type: 'image' });
        } else if (typeof item === 'object' && item.original) { // Handle each item as object with 'original' property
          previews.push({ thumbnail: item.original, type: 'image' });
        }
      });
    }
  }
  return previews;
};






export default function Uploader({ onChange, value, defaultValue,multiple }: any) {
  const { t } = useTranslation();
  const [files, setFiles] = useState<Attachment[]>(getPreviewImage([defaultValue]));
  const { mutate: upload, isLoading: loading } = useUploadMutation();
  console.log('uploader FileInput', files)
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: '0px', y: '0px' });




// Handle right-click event
const handleRightClick = (event) => {
  // Comment out this line to let the default right-click behavior happen
  // event.preventDefault();

  // You can use conditions here to determine whether to show
  // your custom context menu or not. For this example, I'm just showing it.
  setShowContextMenu(true);
  setContextMenuPos({ x: `${event.pageX}px`, y: `${event.pageY}px` });
}

// When clicking elsewhere, hide the custom context menu
const handleCloseContextMenu = () => {
  setShowContextMenu(false);
}


  // Handle the paste event
 // Handle the paste event
const handlePaste = (event: React.ClipboardEvent) => {
  event.preventDefault(); // Prevent default behavior
  const items = (event.clipboardData || (window as any).clipboardData).items;
  const fileList: File[] = [];
  for (let index in items) {
    const item = items[index];
    if (item.kind === 'file') {
      const file = item.getAsFile(); // Get the file as is, without changing type or name
      fileList.push(file);
    }
  }
  if (fileList.length) {
    upload(
      fileList, // it will be an array of uploaded attachments
      {
        onSuccess: (data) => {
          let mergedData;
          if (multiple) {
            mergedData = files.concat(data);
            setFiles(files.concat(data));
          } else {
            mergedData = data[0];
            setFiles(data);
          }
          if (onChange) {
            onChange(mergedData);
          }
        },
      }
    );
  }
};
  
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*, application/pdf",
    multiple,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length) {
        upload(
          acceptedFiles, // it will be an array of uploaded attachments
          {
            onSuccess: (data) => {
              console.log(data,"image");
              let mergedData;
              if (multiple) {
                mergedData = files.concat(data);
                setFiles(files.concat(data));
              } else {
                mergedData = data[0];
                setFiles(data);
              }
              if (onChange) {
                onChange(mergedData);
              }
            },
          }
        );
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
          {file.type === "application/pdf" ? (
            <span>PDF</span> // Here you can also use a PDF icon
          ) : (
            <div className="flex items-center justify-center min-w-0 w-16 h-16 overflow-hidden">
              <img src={file.thumbnail} alt='Preview' />
            </div>
          )}
        
            <button
              className="w-4 h-4 flex items-center justify-center rounded-full bg-red-600 text-xs text-light absolute top-1 end-1 shadow-xl outline-none"
              onClick={() => handleDelete(file.thumbnail)}
            >
              <CloseIcon width={10} height={10} />
            </button>
          
        </div>
      );
    }
  });

    
          
            
    
  
  // useEffect(
  //   () => () => {
  //     // Make sure to revoke the data uris to avoid memory leaks
  //     files.forEach((file: any) => URL.revokeObjectURL(file.thumbnail));
  //   },
  //   [files]
  // );
  return (
    <section className="upload">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none",
        })}
        contentEditable="true"  // Make the div content-editable
        suppressContentEditableWarning={true}  // Suppress warning in React for contentEditable without state change
        onPaste={handlePaste}
      >
        <input {...getInputProps()} />
        <UploadIcon className="text-muted-light" />
        <p className="text-body text-sm mt-4 text-center">
          <span className="text-accent font-semibold">
            {t(" Upload an image")}
          </span>{" "}
          {t(" or drag & drop")} <br />
          <span className="text-xs text-body">{t("text-img-format")}</span>
        </p>
      </div>
      {(!!thumbs.length || loading) && (
      <aside className="flex flex-wrap mt-2">
        {files?.map((file, idx) => (
          <div key={idx} className="inline-flex flex-col overflow-hidden border border-border-200 rounded mt-2 me-2 relative">
            {/* Display the image */}
          {/* {  file?.id && */}
          <div className="flex items-center justify-center min-w-0 w-16 h-16 overflow-hidden">
              <img className="" src={file.thumbnail} alt={''} />
              
            </div>
          {/* } */}
            {/* Add a delete button */}
            <button
              className="w-4 h-4 flex items-center justify-center rounded-full bg-red-600 text-xs text-light absolute top-1 end-1 shadow-xl outline-none"
              onClick={() => handleDelete(file.thumbnail)}
            >

              <CloseIcon width={10} height={10} />
              {/* Replace with your CloseIcon component */}
            </button>
          </div>
        ))}
      </aside>
    
     
      )}
    </section>

) ;
}