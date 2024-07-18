import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useQuery } from 'react-query';


const getUserAllAttemptedExams = async (user_id) => {
  const { data } = await http.get(`${API_ENDPOINTS.USER_ALL_ATTEMPTED_EXAMS}/${user_id}/`);
  return data;
};

export const useUserAllAttemptedExamsQuery = (user_id) => {
  return useQuery(['userAllExamAttempts', user_id], () => getUserAllAttemptedExams(user_id));
};

