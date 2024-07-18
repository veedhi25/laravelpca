import { useQuery } from 'react-query';
import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';

const getExamAttempteStatus = async (examId, userId) => {
  const { data } = await http.get(`${API_ENDPOINTS.EXAM_STATUS}/${examId}/${userId}`);
  return data;
};

export const useExamAttemptStatus = (examId, userId) => {
  return useQuery(['examAttemptStatus', examId, userId], () => getExamAttempteStatus(examId, userId));
};
