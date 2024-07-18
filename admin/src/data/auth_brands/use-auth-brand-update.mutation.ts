import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";

export const useAuthBrandUpdateMutation = () => {

    const queryClient = useQueryClient();
  
    return useMutation(
      (data: any) => http.put(API_ENDPOINTS.UPDATE_AUTH_BRANDS, data), // data is now passed as the second argument
      {
        // Always refetch after error or success:
        onSettled: () => {
          queryClient.invalidateQueries(API_ENDPOINTS.GET_AUTH_BRANDS);
        },
      }
      
    );
  };
