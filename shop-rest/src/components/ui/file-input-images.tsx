import Uploader from "@components/common/uploader-images";
import { Controller } from "react-hook-form";

interface FileInputProps {
  control: any;
  name: string;
  multiple?: boolean;
  reset?: any;

}
const FileInput = ({ control, name, multiple = true, reset }: FileInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field: { ref, ...rest } }) => (
        <Uploader {...rest} multiple={multiple} reset={reset} />
      )}
    />
  );
};

export default FileInput;
