import { useMutation } from "react-query";
import { DeliveryService, VerifyCheckoutInputType } from "./delivery.service";

export const useVerifyCheckoutMutation = () => {
  return useMutation((input: VerifyCheckoutInputType) =>
    DeliveryService.verifyCheckout(input)
  );
};
