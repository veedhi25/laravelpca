import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import { useMutation } from "react-query";
import { OrderService } from "./order.service";

type OrderCreateInputType = {
  [key: string]: unknown;
};

export const useUpiPaymentMutation = () => {
  return useMutation(async (input) => {
    const { data: upi_payment } = await http.post(API_ENDPOINTS.UPI_PAYMENT, input);
    return upi_payment;
  });
};
