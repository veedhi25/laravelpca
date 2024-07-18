import Shop from "@repositories/shop";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { toast } from "react-toastify";

export interface IShopCreateVariables {
  variables: {
    input: any;
  };
}

export const useCreateDeliveryCostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ variables: { input } }: IShopCreateVariables) =>
      Shop.create(API_ENDPOINTS.DELIVERY_COST, input),
    {
      onSuccess: () => {
        toast.success("Successfully updated!");  
      },
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.DELIVERY_COST);
      },
    }
  );
};
