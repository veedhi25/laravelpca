import * as yup from "yup";
export const tagValidationSchema = yup.object().shape({
  name: yup.string().required("form: Name required"),
  // type: yup.object().nullable().required("form:error-type-required"), 
});
