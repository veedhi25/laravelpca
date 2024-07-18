import Uploader from "@components/common/uploader";
import { Controller } from "react-hook-form";

interface FileInputProps {
  control: any;
  name: string;
  multiple?: boolean;
}

const FileInput = ({ control, name, onChange, multiple = true , defaultValue  }: FileInputProps) => {
   console.log('FileInput', defaultValue)
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { ref, ...rest } }) => (
        <Uploader {...rest} multiple={multiple}  defaultValue={defaultValue}  onChange={onChange} />
      )}
    />
  );
  
};

export default FileInput;
