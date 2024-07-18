import { useMutation, useQueryClient } from "react-query";
import Category from "@repositories/category";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const useDeleteLogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Category.delete(`${API_ENDPOINTS.LOGS}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.LOGS);
      },
    }
  );
};
