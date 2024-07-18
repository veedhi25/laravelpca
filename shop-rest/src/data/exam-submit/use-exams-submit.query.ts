import { useQuery } from 'react-query';
import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';

const getExams = async () => {
  const { data } = await http.get(API_ENDPOINTS.EXAM_ATTEMPTS);
  return data;
};

export const useSubmitExamsQuery = () => {
  return useQuery('submitExams', getExams);
};
