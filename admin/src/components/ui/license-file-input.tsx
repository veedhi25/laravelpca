import Uploader from "@components/common/lincense-uploader";
import { Controller } from "react-hook-form";

interface FileInputProps {
  control: any;
  name: string;
  multiple?: boolean;
}

const LicenseFileInput = ({ control, name, multiple = true }: FileInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field: { ref, ...rest } }) => (
        <Uploader {...rest} multiple={multiple} />
      )}
    />
  );
  
};

export default LicenseFileInput;
