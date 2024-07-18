import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers";
// import Joi from "joi";

// const schema = Joi.object({
//   file: Joi.any().required(),
// });

function FileUploadForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    // resolver: joiResolver(schema),
  });

  const onSubmit = (data) => {
    // Handle the submitted data here, including the uploaded file (data.file).
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" {...register("file")} />
      {errors.file && <p>{errors.file.message}</p>}
      <button type="submit">Upload PDF</button>
    </form>
  );
}
 
export default FileUploadForm;
