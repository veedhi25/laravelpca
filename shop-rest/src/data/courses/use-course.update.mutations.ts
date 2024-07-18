import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export const useUpdateCourseMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
   
    const router = useRouter();
  
    return useMutation(
      ({ courseId, updatedCourse }) => {
        console.log('Updated Course:', updatedCourse); 
        return http.put(`${API_ENDPOINTS.COURSES}/${courseId}`, updatedCourse);
      },
      {
        onSuccess: () => {
          toast.success(t("common:successfully-updated"));
          router.push('/courses')
        },
        // Always refetch after error or success:
        onSettled: () => {
          queryClient.invalidateQueries(API_ENDPOINTS.COURSES);
        },
      }
    );
  };
  
  
