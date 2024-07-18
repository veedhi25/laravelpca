// use-brand-create.mutations.ts
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";

export const useCreateRetailerBrandMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (newBrand) => http.post(API_ENDPOINTS.RETAILER_BRANDS, newBrand),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.RETAILER_BRANDS);
      },
    }
  );
};
