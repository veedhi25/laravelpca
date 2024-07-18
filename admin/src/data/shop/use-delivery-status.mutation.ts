import Shop from "@repositories/shop";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
export interface IShopApproveVariables {
  variables: {
    id: string;
  };
}

export const useDeliveryShopMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables }: IShopApproveVariables) =>
      Shop.disapprove(API_ENDPOINTS.SHOP_DELIVERY_STATUS, variables),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
      },
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ADMIN_SHOP);
      },
    }
  );
};
