import { useQuery } from 'react-query';
import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';

export const useCoursesQuery = () => {
  return useQuery('courses', () => http.get(API_ENDPOINTS.COURSES));
};
