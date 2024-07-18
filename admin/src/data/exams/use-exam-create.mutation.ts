import { useMutation } from 'react-query';
 import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';

const createExam = async (examData) => {
  const { data } = await http.post(API_ENDPOINTS.EXAMS, examData);
  return data;
};

export const useCreateExamMutation = () => {
  return useMutation(createExam);
};
