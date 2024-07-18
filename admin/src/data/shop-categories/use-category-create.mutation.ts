import { CreateShopCategory } from "@ts-types/generated";
import { ROUTES } from "@utils/routes";
import Category from "@repositories/category";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export interface ICategoryCreateVariables {
  variables: { input: CreateShopCategory };
}

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: ICategoryCreateVariables) =>
      Category.create(API_ENDPOINTS.SHOP_CATEGORIES, input),
    {
      onSuccess: () => {
        router.push(ROUTES.SHOP_CATEGORIES);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.SHOP_CATEGORIES);
      },
    }
  );
};
