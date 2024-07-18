import { useQuery } from 'react-query';
import axios from 'axios';
import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';


export const fetchExamAttemptsByExamId = async (examId: any, page: number = 1, isMock?: number) => {
  let url = `${API_ENDPOINTS.EXAM_ATTEMPTS}/${examId}?page=${page}`;
  if (isMock !== undefined) {
    url += `&is_mock=${isMock}`;
  }
  const response = await http.get(url);
  return response.data;
};



export const useExamAttemptsQuery = (examId: any, page: number = 1, isMock?: number) => {
  return useQuery(['examAttempts', examId, page, isMock], () => fetchExamAttemptsByExamId(examId, page, isMock));
};
