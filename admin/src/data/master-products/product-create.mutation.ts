import { CreateProduct } from "@ts-types/generated";
import { ROUTES } from "@utils/routes";
import Product from "@repositories/product";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    (input: CreateProduct) => Product.create(API_ENDPOINTS.MASTER_PRODUCT, input),
    {
      onSuccess: () => {
        router.push(`${ROUTES.MASTER_PRODUCT}`);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.MASTER_PRODUCT);
      },
    }
  );
};
