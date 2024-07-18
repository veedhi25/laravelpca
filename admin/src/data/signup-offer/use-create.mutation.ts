import { SignupOfferInput } from "@ts-types/generated";
import User from "@repositories/user";
import { useMutation } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { toast } from "react-toastify";

export interface IRegisterVariables {
  variables: SignupOfferInput;
}

export const useCreateUserMutation = () => {

  return useMutation(
    ({ variables }: IRegisterVariables) =>
      User.register(API_ENDPOINTS.SIGNUP_OFFER, variables),
    {
      onSuccess: () => {
        toast.success(("signup offer stored successfully"));
      },
    }
  );
};
