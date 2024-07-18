import * as yup from "yup";
export const ValidationSchema = yup.object().shape({
  name: yup.string().required("form: Name required"),
  balance: yup.object().shape({
    payment_info: yup.object().shape({
      email: yup
        .string()
        .typeError("form: error-email-string")
        .email("form:error-email-format"),
      account: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value)),
    }),
  }),
});
