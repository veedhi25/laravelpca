// use-brand-delete.mutation.ts
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";


export const useDeleteRetailerBrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id) => http.delete(`${API_ENDPOINTS.RETAILER_BRANDS}/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.RETAILER_BRANDS);
      },
    }
  );
};
