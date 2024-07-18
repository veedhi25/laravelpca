
import { useMutation } from "react-query";
import { PaymentService } from "./delivery.service";

type OrderCreateInputType = {
  [key: string]: unknown;
};

export const useCreateDeliveryMutation = () => {
  return useMutation((input: OrderCreateInputType) =>
    PaymentService.create(input)
  );
};
