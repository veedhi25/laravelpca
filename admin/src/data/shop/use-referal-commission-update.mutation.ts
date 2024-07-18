import { ReferalCommissionInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Shop from "@repositories/shop";
import { API_ENDPOINTS } from "@utils/api/endpoints";
export interface ReferalCommission {
  variables: {
    input: ReferalCommissionInput;
  };
}

export const useCommsionReferalMutation = () => {
  
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { input } }: ReferalCommission) =>
      Shop.update(`${API_ENDPOINTS.UPDATE_REFERRAL_COMMISSION}`, input),
    {
      onSuccess: () => {
        toast.success("Successfully updated!");
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.SHOP_COMMISSION);
      },
    }
  );
};
