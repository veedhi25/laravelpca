import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useQuery } from 'react-query';

const getAllCoursesWithExamsAndAttempts = async () => {
  const { data } = await http.get(API_ENDPOINTS.COURSES_WITH_EXAM_ATTEMPTS);
  return data;
};

export const useCoursesWithExamsAndAttemptsQuery = () => {
  return useQuery('coursesWithExamsAndAttempts', getAllCoursesWithExamsAndAttempts);
};
