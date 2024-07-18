import { CreateProduct } from "@ts-types/generated";
import { ROUTES } from "@utils/routes";
import Product from "@repositories/product";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();
  // const router = useRouter();

  return useMutation(
    (input: CreateProduct) => Product.create(API_ENDPOINTS.STORE_MASTER_PRODUCT, input),
    {
      onSuccess: () => {
        toast.success("Product created Successfully");
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.STORE_MASTER_PRODUCT);

      },
    }
  );
};
