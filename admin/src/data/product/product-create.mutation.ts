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
    (input: CreateProduct) => Product.create(API_ENDPOINTS.PRODUCTS, input),
    {
      onSuccess: () => {
        if(process.browser){
          var pathname = ( window.location.href.includes("/brand-offers") && ROUTES.BRAND_OFFERS)
          || (window.location.href.includes("products") && ROUTES.PRODUCTS) || window.location.href.includes('/offers') && ROUTES.OFFERS;
        } else {
          var pathname = ROUTES.PRODUCTS;
        }
        router.push(`/${router?.query?.shop}${pathname}`);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS);
      },
    }
  );
};
