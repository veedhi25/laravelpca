
import { useMutation } from "react-query";
import { AuthService, VerifyUserInputType } from "./auth.service";

export const useVerifyOtpTokenMutation = () => {
    return useMutation((input: VerifyUserInputType) =>
        AuthService.verifyOtpToken(input)
    );
};
