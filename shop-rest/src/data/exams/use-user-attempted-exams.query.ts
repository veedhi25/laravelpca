import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useQuery } from 'react-query';


const getUserAttemptedExams = async (user_id, course_id) => {
  const { data } = await http.get(`${API_ENDPOINTS.USER_ATTEMPTED_EXAMS}/${user_id}/${course_id}`);
  return data;
}; 

export const useUserAttemptedExamsQuery = (user_id, course_id) => {
  return useQuery(['examsAttempts', user_id, course_id], () => getUserAttemptedExams(user_id, course_id));
};

