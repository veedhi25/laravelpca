import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export const useCreateCourseMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const router = useRouter();
  
    return useMutation(
      (newCourse) => {
        console.log('Course Name:', newCourse); // log courseName before sending request
        return http.post(API_ENDPOINTS.COURSES, newCourse);
      },
      {
        onSuccess: () => {
          toast.success(t("common:successfully-created"));
          router.push('/courses')
        },
        // Always refetch after error or success:
        onSettled: () => {
          queryClient.invalidateQueries(API_ENDPOINTS.COURSES);
        },
      }
    );
  };
  
