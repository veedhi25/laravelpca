import * as yup from "yup";
export const ReferalValidationSchema = yup.object().shape({
  customer_commission: yup.string().required("customer commission is required"),
  level1_commission: yup.string().required("level1 commission is required"),
  level2_commission: yup.string().required("level2 commission is required"),
  level3_commission: yup.string().required("level3 commission is required"),
});
