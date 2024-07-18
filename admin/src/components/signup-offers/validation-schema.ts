import * as yup from "yup";
export const customerValidationSchema = yup.object().shape({
  invitee_reward: yup.string().required("Invitee reward is required"),
  inviter_reward: yup.string().required("Inviter reward is required"),
});
