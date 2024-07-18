import Withdraw from "@repositories/withdraw";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export interface IDeliveryCreateVariables {
  variables: {
    input: any;
  };
}

export const useDeliveryConfigMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    (input : IDeliveryCreateVariables) =>
      Withdraw.create(API_ENDPOINTS.SHOP_DELIVERY_CONFIG, input.inputs),
    {
      onSuccess: (response) => {
        toast.success(("configuration stored successfully"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.DELIVERY);
      },
    }
  );
};
