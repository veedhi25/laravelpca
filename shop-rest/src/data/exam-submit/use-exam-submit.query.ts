import { useQuery } from 'react-query';
import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';

const getExamById = async (examId:any) => {
  const { data } = await http.get(`${API_ENDPOINTS.EXAM_ATTEMPTS}/${examId}`);
  return data;
};

export const useSubmitExamQuery = (examId:any) => {
  return useQuery(['submitExam', examId], () => getExamById(examId));
};
