import user from '@repositories/user';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useTranslation } from 'next-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

export const useToggleDistributorMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
  
    return useMutation(
        
      (userId) => http.put(`${API_ENDPOINTS.SHOPS}/${userId}/distributer`),
      
      {
        onSuccess: () => {
          toast.success(t("common:successfully-updated"));
        },
        // Always refetch after error or success:
        onSettled: () => {
          queryClient.invalidateQueries(API_ENDPOINTS.ADMIN_SHOP);
        },
      }
    );
  };