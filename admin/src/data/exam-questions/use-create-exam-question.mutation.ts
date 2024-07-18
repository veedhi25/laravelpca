import { useMutation } from 'react-query';
 import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';

const createExamQuestion = async (examData:any) => {
  const { data } = await http.post(API_ENDPOINTS.EXAM_QUESTIONS, examData);
  return data;
};

export const useCreateExamQuestionMutation = () => {
  return useMutation(createExamQuestion);
};
