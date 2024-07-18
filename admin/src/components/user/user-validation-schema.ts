import * as yup from "yup";
export const customerValidationSchema = yup.object().shape({
  name: yup.string().required("form: Name required"),
  email: yup
    .string()
    .email("form:error-email-format"),
    // .required("form: Email required"),
  password: yup.string().required("form: Password required"),
});
