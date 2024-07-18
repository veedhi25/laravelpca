import { useMutation } from "react-query";
import { AuthService, OtpLoginInputType } from "./auth.service";

export const useOtpRegisterMutation = () => {
  return useMutation((input: OtpLoginInputType) =>
    AuthService.otpRegister(input)
  );
};
