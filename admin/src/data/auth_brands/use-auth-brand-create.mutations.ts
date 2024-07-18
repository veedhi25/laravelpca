import { useMutation, useQueryClient } from "react-query";
 import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import { toast } from "react-toastify";
import { Router, useRouter } from "next/router";

export const useAuthBrandCreateMutation = () => {

    const queryClient = useQueryClient();
    const router = useRouter();
  
    return useMutation(
      (data: any) => http.post(API_ENDPOINTS.ADD_AUTH_RETAILERS, data), // data is now passed as the second argument
      {
        onSuccess: () => {
            toast.success(("Brands Assigned Successfully"));
            router.push('/retail-store/auth-brands')
          },
        // Always refetch after error or success:
        onSettled: () => {
          queryClient.invalidateQueries(API_ENDPOINTS.ADD_AUTH_RETAILERS);
        },
        
      }
    );
  };
