import { useQuery } from 'react-query';
import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';

const fetchExamQuestionById = async (examQuestionId: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.EXAM_QUESTIONS}/${examQuestionId}`);
  return data;
};

export const useExamQuestionQuery = (examQuestionId: string) => {
  return useQuery(['exam_question', examQuestionId], () => fetchExamQuestionById(examQuestionId));
};
