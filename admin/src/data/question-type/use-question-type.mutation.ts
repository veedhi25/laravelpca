import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useTranslation } from 'next-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

export const useCreateQuestionTypeMutation = () => {
    return useMutation((questionType) => {
       return http.post(API_ENDPOINTS.QUESTION_TYPE, questionType);
    });
  };
  

  export const useUpdateQuestionTypeMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
  
    return useMutation(
      ({ id, input }: { id: string; input: any }) => {
   
        return http.put(`${API_ENDPOINTS.QUESTION_TYPE}/${id}`, input);
      },
      {
        onSuccess: () => {
          toast.success(t("common:successfully-updated"));
        },
        onSettled: () => {
          queryClient.invalidateQueries(API_ENDPOINTS.QUESTION_TYPE);
        },
      }
    );
  };
  
