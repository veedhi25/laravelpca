import { UpdateProduct } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Product from "@repositories/product";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useTranslation } from "next-i18next";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";


export interface IProductUpdateVariables {
  variables: { id: string; input: UpdateProduct };
}

export const useUpdateProductMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router = useRouter();


  return useMutation(
    ({ variables: { id, input } }: IProductUpdateVariables) =>
      Product.update(`${API_ENDPOINTS.MASTER_PRODUCT}/${id}`, input),
    {
      onSuccess: () => {
        router.push(`${ROUTES.MASTER_PRODUCT}`);
        // toast.success(t("common:successfully-updated"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.MASTER_PRODUCT);
      },
    }
  );
};
