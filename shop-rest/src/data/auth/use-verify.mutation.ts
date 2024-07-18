import { useMutation } from "react-query";
import { AuthService, VerifyUserInputType } from "./auth.service";

export const useVerifyMutation = () => {
  return useMutation((input: VerifyUserInputType) =>
    AuthService.verfiy(input)
  );
};
