import { useQuery } from 'react-query';
import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';

export const useCourseQuery = (courseId) => {
    return useQuery(['course', courseId], () => http.get(`${API_ENDPOINTS.COURSES}/${courseId}`));
  };
  