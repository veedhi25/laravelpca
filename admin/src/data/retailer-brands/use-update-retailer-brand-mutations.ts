// use-brand-delete.mutation.ts
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";

export const useUpdateRetailerBrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data }:any) => {
      console.log('mutations ID:', id);  // add console.log here
      console.log('mutations Data:', data);  // add console.log here
      return http.put(`${API_ENDPOINTS.RETAILER_BRANDS}/${id}`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.RETAILER_BRANDS);
      },
    }
  );
};


