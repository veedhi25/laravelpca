import { ShopInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Shop from "@repositories/shop";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export interface IShopUpdateVariables {
  variables: {
    id: string;
    input: ShopInput;
  };
}

export const useUpdateShopMutation = () => {
  
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, input } }: IShopUpdateVariables) =>
      Shop.update(`${API_ENDPOINTS.SHOPS}/${id}`, input),
    {
      onSuccess: () => {
        toast.success("Successfully updated!");
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ADMIN_SHOP);
      },
    }
  );
};
