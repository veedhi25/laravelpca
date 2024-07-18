import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import url from "@utils/api/server_url";
import { useMutation, useQueryClient } from "react-query";

// Custom hook for deleting an image
export const useDeleteImageMutation = () => {
    const queryClient = useQueryClient();
  
    return useMutation(
      (imageId) => {
        return http.delete(`${url}/${API_ENDPOINTS.DELETE_IMAGE}/${imageId}`);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(API_ENDPOINTS.IMAGES_BY_USER_ID);
        },
      }
    );
  };
  